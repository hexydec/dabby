/*! dabbyjs v0.9.7 by Will Earp - https://github.com/hexydec/dabby */

const $ = function dabby(selector, context) {

	// if no selector, return empty colletion
	if (this instanceof dabby) {
		selector = Array.from(selector).filter(node => [1, 9, 11].indexOf(node.nodeType) > -1 || $.isWindow(node)); // only element, document, documentFragment and window
		this.length = selector.length;
		Object.assign(this, selector);
		return this;
	}

	// $ collection
	if (selector instanceof dabby) {
		return selector;
	}

	let nodes = [],
		match;

	// gather nodes
	if (selector) {

		// single node
		if (selector.nodeType || $.isWindow(selector)) {
			nodes = [selector];

		// ready function
		} else if ($.isFunction(selector)) {
			if (document.readyState !== "loading") {
				selector.call(document, $);
			} else {
				document.addEventListener("DOMContentLoaded", () => {selector.call(document, $);}, {once: true});
			}

		// array|NodeList|HTMLCollection of nodes
		} else if (typeof selector !== "string") {
			nodes = selector;

		// CSS selector
		} else if (selector.indexOf("<") === -1) {
			$(context || document).each((i, obj) => {
				nodes = nodes.concat(Array.from(obj.querySelectorAll(selector)));
			});

		// create a single node and attach properties
		} else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {
			nodes = [document.createElement(match[1])];

			// context is CSS attributes
			if (context instanceof Object) {
				$(nodes).attr(context);
			}

		// parse HTML into nodes
		} else {
			const obj = document.implementation.createHTMLDocument("");
			obj.body.innerHTML = selector;
			nodes = obj.body.children;
		}
	}
	return new dabby(nodes);
};

// alias functions
$.fn = $.prototype;

$.each = (obj, callback) => {
	const isArr = Array.isArray(obj),
		keys = Object.keys(obj),
		len = keys.length;

	for (let i = 0; i < len; i++) {
		if (callback.call(obj[keys[i]], isArr ? parseInt(keys[i]) : keys[i], obj[keys[i]]) === false) {
			break; // stop if callback returns false
		}
	}
	return obj;
};

$.fn.each = function (callback) {
	$.each(Array.from(this), callback);
	return this;
};

$.isWindow = obj => obj !== null && obj === obj.window;

$.isFunction = func => func && func.constructor === Function;

//import "../attributes/attr/attr.js"; // must add attr yourself if you want this functionality, as it could make your build smaller

$.isPlainObject = obj => {

	// Basic check for Type object that's not null
	if (typeof obj === "object" && obj !== null) {

		// If Object.getPrototypeOf supported, use it
	    if (typeof Object.getPrototypeOf === 'function') {
			let proto = Object.getPrototypeOf(obj);
			return proto === Object.prototype || proto === null;
	    }

	    // Otherwise, use internal class
	    // This should be reliable as if getPrototypeOf not supported, is pre-ES5
		return Object.prototype.toString.call(obj) === "[object Object]";
 	}

 	// Not an object
	return false;
};

$.extend = (...arrs) => {
	if (arrs[0] === true) {

		// merge function will recursively merge items
		function merge(target, ...sources) {
			if (sources.length) {

				// work on next source
				const source = sources.shift();
				if ($.isPlainObject(target) && $.isPlainObject(source)) {

					// loop through each property
					$.each(source, (i, val) => {

						// merge recursively if source is object, if target is not object, overwrite
						if ($.isPlainObject(val)) {
							target[i] = $.isPlainObject(target[i]) ? merge(target[i], val) : val;

						// when source property is value just overwrite
						} else {
							target[i] = val;
						}
					});
				}

				// merge next source
			    return merge(target, ...sources);
			}
			return target;
		}
		return merge.apply(null, arrs.slice(1));
	}
	return Object.assign.apply(null, arrs);
};

$.param = obj => {
	let params = [],
		add = (key, value, params) => {
			let isArr = Array.isArray(value);
			if (isArr || typeof value === "object") {
				$.each(value, (i, val) => {
					params = add(`${key}[${isArr ? "" : i}]`, val, params);
				});
			} else {
				if ($.isFunction(value)) {
					value = value();
				}
				params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value === null ? "" : value));
			}
			return params;
		};

	// process values
	$.each(obj, (key, item) => {
		params = add(key, item, params);
	});
	return params.join("&");
};

$.ajax = (url, settings) => {

	// normalise args
	if (typeof url === "object") {
		settings = url;
	} else {
		if (typeof settings !== "object") {
			settings = {};
		}
		settings.url = url;
	}

	// set default settings
	settings = Object.assign({
		method: "GET",
		cache: null, // start will null so we can see if explicitly set
		data: null,
		dataType: null, // only changes behavior with json, jsonp, script
		async: true,
		crossDomain: false,
		scriptCharset: null,
		jsonp: "callback",
		jsonpCallback: "dabby" + Date.now(),
		headers: {
			"X-Requested-With": "XMLHttpRequest"
		},
		xhr: () => new XMLHttpRequest(),
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		context: null,
		statusCode: {},
		username: null,
		password: null,
		xhrFields: {}
	}, settings);

	// determine datatype
	if (!settings.dataType && settings.url.split("?")[0].split(".").pop() === "js") {
		settings.dataType = "script";
	}

	let sync = ["script", "jsonp"].indexOf(settings.dataType) > -1,
		join = settings.url.indexOf("?") > -1 ? "&" : "?",
		script, data;

	// add data to query string
	if (settings.data) {
		if (typeof settings.data === "string" || settings.data instanceof FormData) {
			data = settings.data;
		} else {
			data = $.param(settings.data);
		}
	}
	if (data && settings.method === "GET") {
		settings.url += join + data;
		join = "&";
	}

	// add cache buster
	if (settings.cache || (settings.cache === null && sync)) {
		settings.url += join + "_=" + (+new Date());
		join = "&";
	}

	// fetch script
	if (sync || settings.crossDomain) {
		script = document.createElement("script");
		if (settings.scriptCharset) {
			script.charset = settings.scriptCharset;
		}

		// add callback parameter
		if (settings.dataType === "jsonp") {
			settings.url += join + settings.jsonp + "=" + settings.jsonpCallback;
		}

		// setup event callbacks
		$.each({
			load: "success",
			error: "error"
		}, (key, value) => {
			script.addEventListener(key, () => {
				const response = settings.dataType === "jsonp" ? window[settings.jsonpCallback] || null : null;
				[settings[value], settings.complete].forEach(callback => {
					if (callback) {
						callback.apply(settings.context || settings, callback === settings.complete ? [null, value] : [response, value]);
					}
				});
			}, {once: true});
		});

		script.src = settings.url;
		script.async = settings.async;
		document.head.appendChild(script);

	// make xhr request
	} else {
		const xhr = settings.xhr(),
			callback = (xhr, type, status) => {
				let response = xhr.responseText;

				// parse JSON
				if (["json", null, undefined].indexOf(settings.dataType) > -1) {
					try {
						response = JSON.parse(response);
					} catch (e) {
						// do nothing
					}
				}

				// run callbacks
				[settings.statusCode[xhr.status], settings[type], settings.complete].forEach((callback, i) => {
					if (callback) {
						callback.apply(settings.context || settings, i < 2 ? [response, status, xhr] : [xhr, status]);
					}
				});
			};

		// XHR settings
		$.each(settings.xhrFields, (key, value) => xhr[key] = value);

		// callbacks
		xhr.onload = () => {
			const status = [200, 204, 304].indexOf(xhr.status) > -1 ? "success" : "error";
			callback(xhr, status, status);
		};
		xhr.ontimeout = () => {
			callback(xhr, "error", "timeout");
		};
		xhr.onabort = () => {
			callback(xhr, "error", "abort");
		};
		xhr.onerror = () => {
			callback(xhr, "error", "error");
		};

		xhr.open(settings.method, settings.url, settings.async, settings.username, settings.password);

		// add headers
		if (settings.contentType) {
			settings.headers["Content-Type"] = settings.contentType;
		}
		$.each(settings.headers, (key, value) => {
			xhr.setRequestHeader(key, value);
		});

		// send request
		xhr.send(settings.method === "GET" ? null : data);
		return xhr;
	}
};

["get", "post"].forEach(name => {
	$[name] = (url, data, success, type) => {
		const isFunc = $.isFunction(data);
		let settings = typeof(url) === "object" ? url : {
			url: url,
			data: isFunc ? {} : data,
			success: isFunc ? data : success,
			dataType: isFunc ? success : type
		};
		settings.method = name.toUpperCase();
		return $.ajax(settings);
	};
});

$.getScript = (url, success) => $.ajax({
	url: url,
	dataType: "script",
	success: success
});

var filterNodes = (dabby, filter, context, not) => {
	let func,
		nodes = dabby.nodeType ? [dabby] : Array.from(dabby);

	// sort out args
	if (typeof context === "boolean") {
		not = context;
		context = null;
	}

	// custom filter function
	if ($.isFunction(filter)) {
		func = filter;

	// nodes
	} else {

		// normalise filters
		if (typeof filter === "string") {
			filter = [filter];
		} else {
			filter = Array.from($(filter, context));
		}

		// default filter function
		func = (n, node) => {
			let i = filter.length;
			while (i--) {
				if (typeof(filter[i]) === "string" && node.matches ? node.matches(filter[i]) : node === filter[i]) {
					return true;
				}
			}
			return false;
		};
	}
	return nodes.filter((item, i) => func.call(item, i, item) === !not, nodes);
}

["filter", "not", "is"].forEach(name => {
	$.fn[name] = function (selector) {
		const nodes = filterNodes(this, selector, name === "not");
		return name === "is" ? !!nodes.length : $(nodes);
	};
});

$.fn.load = function (url, data, success) {
	if (this[0]) {

		// get selector from URL
		url = url.split(" ", 2);
		const uri = url[0],
			selector = url[1];

		// check for data
		if ($.isFunction(data)) {
			success = data;
			data = undefined;
		}

		// make AJAX request
		$.ajax(uri, {
			data: data,
			type: data instanceof Object ? "POST" : "GET",
			success: (response, status, xhr) => {

				// if a selector is specified, find it in the returned document
				let html = "",
					i = this.length;

				// refine by selector if supplied
				if (selector) {
					$(response).filter(selector).each((key, obj) => {
						html += obj.outerHTML;
					});
				} else {
					html = response;
				}

				const nodes = $(html).filter((i, item) => item.tagName.toLowerCase() === "script");

				// set HTML to nodes in collection
				while (i--) {
					this[i].innerHTML = html;

					// include any scripts as they won't execute with innerHTML
					nodes.each((i, item) => {
						const src = item.getAttribute("src"),
							script = document.createElement("script");
						if (src) {
							script.src = src;
						} else {
							script.text = item.innerText;
						}
						document.head.appendChild(script);
					});

					// fire success callback on nodes
					if (success) {
						success.call(this[i], response, status, xhr);
					}
				}
			}
		});
	}
	return this;
};

var getVal = (obj, val, current) => {
	let i = obj.length,
		values = [],
		funcVal = $.isFunction(val),
		objVal = funcVal ? 0 : $.isPlainObject(val),
		funcCurrent = $.isFunction(current);
	while (i--) {
		values[i] = funcVal ? val.call(obj[i], i, funcCurrent ? current(obj[i]) : current) : (objVal ? Object.create(val) : val);
	}
	return values;
}

$.map = (obj, callback) => {
	let arr = [];
	$.each(obj, (i, item) => {
		const result = callback.call(window, item, i);
		if ([null, undefined].indexOf(result) === -1) {
			arr = arr.concat(Array.isArray(result) ? result : [result]);
		}
	});
	return arr;
};

$.fn.val = function (value) {

	// set value
	if (value !== undefined) {
		let i = this.length,
			values = getVal(this, value, obj => obj.val());

		while (i--) {

			// string value, just set to value attribute
			if (!Array.isArray(values[i])) {
				this[i].value = values[i];

			// array on select, set matching values to selected
			} else if (this[i].type === "select-multiple") {
				values[i] = values[i].map(val => String(val));
				$("option", this[i]).each((key, obj) => {
					obj.selected = values[i].indexOf(obj.value) > -1;
				});

			// set the checked attribute for radios and checkbox
			} else {
				this[i].checked = values[i].indexOf(this[i].value) > -1;
			}
		}
		return this;
	}

	// read value from first node
	if (this[0]) {

		// get multiple values
		if (this[0].type === "select-multiple") {
			let values = [];
			$("option", this[0]).each((key, obj) => {
				if (obj.selected) {
					values.push(String(obj.value));
				}
			});
			return values;
		}

		// get single value
		if (this[0].type !== "checkbox" || this[0].checked) {
			return String(this[0].value);
		}
	}
};

$.fn.serialize = function () {
	const selector = "input[name]:not([type=file]):not([type=submit]):not([type=radio]):not([type=checkbox]),input[name]:checked,textarea[name],select[name]",
		add = (name, value, params) => {
			let match;

			if ((match = name.match(/([^\[]*)\[([^\]]*)\](.*)/)) !== null) {
				name = match[1];
				let arr = add(match[2] + match[3], value, params[name] || {});
				value = arr;
			}

			if (name !== "") {
				params[name] = value;
			} else {
				if (!Array.isArray(params)) {
					params = [];
				}
				params = params.concat(Array.isArray(value) ? value : [value]);
			}
			return params;
		};
	let obj = this.filter(selector);

	if (!obj.length) {
		obj = $(selector, this);
	}

	let params = {};

	// process values
	obj.each((key, obj) => {
		const value = $(obj).val();
		if (!obj.disabled && value !== undefined) {
			params = add(obj.name, value, params);
		}
	});
	return $.param(params);
};

$.fn.add = function (nodes, context) {
	nodes = $(nodes, context);
	let len = this.length,
		i = nodes.length;

	this.length += i;
	while (i--) {
		this[i + len] = nodes[i];
	}
	return this;
};

["parent", "parents", "parentsUntil"].forEach(func => {
	$.fn[func] = function (selector, filter) {
		const all = func.indexOf("s") > -1,
			until = func.indexOf("U") > -1;
		let nodes = [],
			i = this.length,
			parent;

		while (i--) {
			parent = this[i].parentNode;
			while (parent && parent.nodeType === Node.ELEMENT_NODE) {
				if (until && filterNodes(parent, selector).length) {
					break;
				}
				nodes.push(parent);
				if (!all) {
					break;
				}
				parent = parent.parentNode;
			}
		}
		if (!until) {
			filter = selector;
		}
		return $(filter ? filterNodes(nodes, filter) : nodes);
	};
});

$.fn.get = function (i) {
	return i === undefined ? Array.from(this) : this[i >= 0 ? i : i + this.length];
};

// add and remove event handlers
["on", "one"].forEach(name => {
	$.fn[name] = function (events, selector, data, callback) {

		// sort out args
		events = events.split(" ");
		if ($.isFunction(selector)) {
			callback = selector;
			selector = undefined;
		} else if ($.isFunction(data)) {
			callback = data;
			data = undefined;
		}

		// attach event
		let i = this.length;
		while (i--) {
			let e = events.length;

			// record the original function
			if (!this[i].events) {
				this[i].events = [];
			}
			let fn = function (evt) { // delegate function
				let target = [this];
				if (selector) {
					let t = $(evt.target);
					target = t.add(t.parents()).filter(selector).get(); // is the selector in the targets parents?
				}
				if (target) {
					evt.data = data; // set data to event object
					for (let i = 0, len = target.length; i < len; i++) {
						if (callback.call(target[i], evt, evt.args) === false) {
							evt.preventDefault();
							evt.stopPropagation();
						}
					}
				}
			};
			this[i].events.push({
				events: events,
				callback: callback,
				selector: selector,
				func: fn,
				once: name === "one"
			});

			// trigger
			while (e--) {
				this[i].addEventListener(events[e], fn, {once: name === "one", capture: !!selector});
			}
		}
		return this;
	};
});

var events = ["focusin", "focusout", "focus", "blur", "resize", "scroll", "unload", "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave", "contextmenu", "change", "select", "keydown", "keypress", "keyup", "error", "submit"];

$.fn.attr = function (prop, value) {
	let isObj = typeof prop !== "string",
		obj = {};

	// set properties
	if (isObj || value !== undefined) {

		// normalise to object
		if (!isObj) {
			obj[prop] = value;
			prop = obj;
		}

		$.each(prop, (key, val) => {

			// if event, hand it off to $.fn.on()
			if (events.indexOf(key) > -1) {
				this.on(key, val);

			// process other values
			} else {
				let i = this.length,
					values = getVal(this, val, obj => $(obj).attr(key));
				while (i--) {
					if (key === "style") {
						this[i].style.cssText = values[i];
					} else if (key === "class") {
						this[i].className = values[i];
					} else if (key === "text") {
						this[i].textContent = values[i];
					} else if (values[i] === null) {
						this[i].removeAttribute(key);
					} else {
						this[i].setAttribute(key, values[i]);
					}
				}
			}
		});
		return this;
	}

	// retrieve properties
	if (this[0]) {
		if (prop === "style") {
			return this[0].style.cssText;
		}
		if (prop === "class") {
			return this[0].className;
		}
		return this[0].getAttribute(prop);
	}
};

const funcs = [];
["removeClass", "addClass", "toggleClass"].forEach((func, f) => {

	// remove "Class" from name for classList method and remember
	funcs.push(func.substr(0, func.length - 5));

	// create function
	$.fn[func] = function (cls, state) {
		let i = this.length,
			values = getVal(this, cls, obj => obj.className),
			key = f;

		if (func === "toggleClass" && typeof state === "boolean") {
			key = 0 + state;
		}

		// manage classes on nodes
		while (i--) {
			if (typeof values[i] === "string") {
				values[i] = values[i].split(" ");
			}
			for (let n = 0, len = values[i].length; n < len; n++) {
				this[i].classList[funcs[key]](values[i][n]);
			}
		}
		return this;
	};
});

var camelise = prop => prop.replace(/-([\w])/g, (text, letter) => letter.toUpperCase()); // matches underscore too but you shouldn't do that anyway

var setCss = (dabby, props, value) => {

	// normalise props
	if (typeof props === "string") {
		const name = props;
		props = {};
		props[name] = value;
	}

	// prepare values
	let values = {};
	$.each(props, (i, prop) => {
		values[camelise(i)] = getVal(dabby, prop, obj => obj.style[i]);
	});

	// set properties
	$.each(values, (key, val) => {
		let i = dabby.length;
		while (i--) {
			dabby[i].style[key] = val[i] + (!val[i] || isNaN(val[i]) ? "" : "px");
		}
	});
	return dabby;
}

$.fn.css = function (props, value) {

	// set the values
	if (value !== undefined || $.isPlainObject(props)) {
		return setCss(this, props, value);
	}

	// retrieve value from first property
	if (this[0]) {
		let name = props,
			i,
			style = getComputedStyle(this[0], ""),
			output = {},
			ret = false;

		if (typeof name === "string") {
			props = [name];
			ret = true;
		}
		i = props.length;
		while (i--) {
			output[props[i]] = style[camelise(props[i])];
			if (ret) {
				return output[props[i]];
			}
		}
		return output;
	}
};

$.fn.data = function (name, data) {

	// convert data to object
	if (typeof name === "object") {
		data = name;
	} else if (data !== undefined) {
		let temp = {};
		temp[name] = data;
		data = temp;
	}

	// set value
	if (data !== undefined) {
		let i = this.length;
		while (i--) {
			$.each(data, (key, value) => {
				this[i].dataset[camelise(key)] = typeof value === "object" ? JSON.stringify(value) : value;
			});
		}
		return this;
	}

	// get value
	if (this[0] && this[0].dataset) {
		let parse = value => {
			try {
				return JSON.parse(value);
			} catch (e) {
				return value;
			}
		};

		// all properties
		if (name === undefined) {
			let arr = {};
			$.each(this[0].dataset, (key, value) => {
				arr[key] = parse(value);
			});
			return arr;
		}

		// retrieve specific property
		name = camelise(name);
		if (this[0].dataset.hasOwnProperty(name)) {
			return parse(this[0].dataset[name]);
		}
	}
};

$.fn.hasClass = function (cls) {
	let i = this.length;
	while (i--) {
		if (this[i].classList.contains(cls)) {
			return true;
		}
	}
	return false;
};

var getProp = prop => {
	let properties = {
		"for": "htmlFor",
		"class": "className",
		"tabindex": "tabIndex",
		"readonly": "readOnly",
		"maxlength": "maxLength",
		"cellspacing": "cellSpacing",
		"cellpadding": "cellPadding",
		"rowspan": "rowSpan",
		"colspan": "colSpan",
		"usemap": "useMap",
		"frameborder": "frameBorder",
		"contenteditable": "contentEditable"
	};
	prop = prop.toLowerCase();
	return properties[prop] || prop;
}

$.fn.prop = function (prop, value) {
	const isObj = $.isPlainObject(prop);

	// set
	if (value !== undefined || isObj) {

		// normalise values
		if (!isObj) {
			const tmp = {};
			tmp[prop] = value;
			prop = tmp;
		}

		// retrieve values
		let values = {};
		$.each(prop, (key, val) => {
			values[getProp(key)] = getVal(this, val, obj => obj[key]);
		});

		// set properties
		$.each(values, (key, val) => {
			let i = this.length;
			while (i--) {
				this[i][key] = val[i];
			}
		});
		return this;
	}

	// get
	if (this[0]) {
		return this[0][getProp(prop)];
	}
};

$.fn.removeProp = function (prop) {
	let i = this.length;
	prop = getProp(prop);

	while (i--) {
		delete this[i][prop];
	}
	return this;
};

["show", "hide", "toggle"].forEach((func, n) => {
	$.fn[func] = function () {
		let i = this.length,
			values = ["block", "none"];
		while (i--) {
			this[i].style.display = values[n] || (getComputedStyle(this[i]).display === "none" ? "block" : "none");
		}
		return this;
	};
});

$.fn.map = function (callback) {
	let len = this.length,
		values = [],
		i = 0;

	for (; i < len; i++) {
		values.push(callback.call(this[i], i, this[i]));
	}
	return values;
};

$.fn.offset = function (coords) {

	// set
	if (coords) {

		// prepare values
		let values = getVal(this, coords, obj => obj.offset()), // copy the object
			i = this.length;

		while (i--) {

			// set position to relative if not positioned
			let pos = getComputedStyle(this[i]).position;
			if (pos === "static") {
				values[i].position = pos = "relative";
			}

			// take off offset parent position
			const parent = this[i][pos === "relative" ? "parentNode" : "offsetParent"];
			$.each($(parent).offset(), (key, val) => values[i][key] -= val);

			// relative add inner offset
			if (pos === "relative") {
				const style = getComputedStyle(parent);
				values[i].top -= parseFloat(style.paddingTop) + parseFloat(style.borderTopWidth);
				values[i].left -= parseFloat(style.paddingLeft) + parseFloat(style.borderLeftWidth);
			}
		}

		// update values in one hit to prevent thrashing
		i = this.length;
		while (i--) {
			$.each(values[i], (key, val) => this[i].style[key] = val + (isNaN(val) ? "" : "px"));
		}
		return this;
	}

	// get
	if (this[0]) {
		const doc = document.documentElement,
			pos = this[0].style.position === "fixed",
			rect = this[0].getBoundingClientRect();
		return {
			top: rect.top + (pos ? 0 : doc.scrollTop),
			left: rect.left + (pos ? 0 : doc.scrollLeft)
		};
	}
};

$.fn.offsetParent = function () {
	return $(this[0] ? this[0].offsetParent : null);
};

$.fn.position = function () {
	if (this[0]) {
		return {left: this[0].offsetLeft, top: this[0].offsetTop};
	}
};

["scrollLeft", "scrollTop"].forEach(item => {
	$.fn[item] = function (pos) {
		const top = item === "scrollTop";

		// set
		if (pos !== undefined) {
			let i = this.length,
				tl = top ? "top" : "left",
				values = getVal(this, pos, obj => obj[item]);
			
			while (i--) {
				if ($.isWindow(this[i])) {
					let obj = {};
					obj[tl] = values[i];
					this[i].scroll(obj);
				} else {
					this[i][item] = values[i];
				}
			}
			return this;
		}

		// get
		if (this[0]) {
			if ($.isWindow(this[0])) {
				item = top ? "pageYOffset" : "pageXOffset";
			}
			return this[0][item];
		}
	};
});

["width", "height", "innerWidth", "innerHeight", "outerWidth", "outerHeight"].forEach(dim => {

	$.fn[dim] = function (val) {
		const width = dim.indexOf("d") > -1,
			wh = width ? "width" : "height", // width or height
			whu = width ? "Width" : "Height", // with uppercase letter
			io = dim.indexOf("inner") > -1 ? "inner" : (dim.indexOf("outer") > -1 ? "outer" : ""), // inner outer or neither
			pos = [
				width ? "Left" : "Top", // first dimension
				width ? "Right" : "Bottom" // second dimension
			];

		// set value
		if (val !== undefined && typeof(val) !== "boolean") {
			let values = getVal(this, val, obj => obj[dim]),
				i = this.length,
				props = [],
				style;
			while (i--) {

				// add additional lengths
				if (io) {

					// fetch current style and build properties
					pos.forEach(item => {
						props.push("padding" + item);
						if (io === "outer") {
							props.push("border" + item + "Width");
						}
					});

					// set width to convert to a px value
					if (isNaN(values[i]) && values[i].indexOf("px") === -1) {
						this[i].style[wh] = values[i];
						props.push(wh);
						values[i] = 0; // reset to 0
					}

					// add values
					style = getComputedStyle(this[i]);
					props.forEach(val => values[i] -= parseFloat(style[val]));
				}
				this[i].style[wh] = values[i] + (isNaN(values[i]) ? "" : "px");
			}
			return this;
		}

		// get value
		if (this[0]) {

			// document
			if (this[0].nodeType === Node.DOCUMENT_NODE) {
				return this[0].documentElement["scroll" + whu];
			}

			// element
			if (!$.isWindow(this[0])) {
				let value = this[0][(io === "outer" ? "offset" : "client") + whu];

				// add padding on, or if outer and margins requested, add margins on
				if (io === "" || (io === "outer" && val === true)) {
					const style = getComputedStyle(this[0]);
					pos.forEach(item => value += parseFloat(style[(io ? "margin" : "padding") + item]) * (io ? 1 : -1));
				}
				return value;
			}

			// window
			if (io === "inner") {
				return this[0].document.documentElement["client" + whu];
			}

			return this[0]["inner" + whu];
		}
	};
});

$.fn.trigger = function (name, data) {
	let i = this.length;
	while (i--) {

		// native submit event doesn't trigger event handlers
		if (name !== "submit" && $.isFunction(this[i][name])) {
			this[i][name]();
		} else {
			const evt = new CustomEvent(name, {bubbles: true, cancelable: true});
			evt.args = data;
			this[i].dispatchEvent(evt);
		}
	}
	return this;
};

events.forEach(event => {
	$.fn[event] = function (data, callback) {
		return data ? this.on(event, data, callback) : this.trigger(event);
	};
});

// add and remove event handlers
$.fn.off = function (events, selector, data, callback) {

	// sort out args
	events = events.split(" ");
	if ($.isFunction(selector)) {
		callback = selector;
		selector = undefined;
	} else if ($.isFunction(data)) {
		callback = data;
		data = undefined;
	}

	// attach event
	let i = this.length;
	while (i--) {

		// find the original function
		if (this[i].events.length) {
			let e = events.length;
			while (e--) {
				this[i].events.forEach((evt, n) => {
					const index = evt.events.indexOf(events[e]);
					if (index !== -1 && (!callback || evt.callback === callback) && (!selector || evt.selector === selector)) {
						this[i].removeEventListener(events[e], evt.func, {once: evt.once, capture: !!evt.selector}); // must pass same arguments
						this[i].events[n].events.splice(index, 1);
						if (!this[i].events[n].events.length) {
							this[i].events.splice(n, 1);
						}
					}
				});
			}
		}
	}
	return this;
};

$.fn.clone = function () {
	let nodes = [],
		i = this.length;

	while (i--) {
		nodes[i] = this[i].cloneNode(true);
	}
	return $(nodes);
};

$.fn.empty = function () {
	let i = this.length;
	while (i--) {
		while (this[i].firstChild && this[i].removeChild(this[i].firstChild));
	}
	return this;
};

$.fn.html = function (html) {

	// set
	if (html !== undefined) {
		let i = this.length,
			values = getVal(this, html, obj => obj.innerHTML);
		while (i--) {
			this[i].innerHTML = values[i];
		}
		return this;
	}

	// get
	if (this[0]) {
		return this[0].innerHTML;
	}
};

$.each({
	before: "beforeBegin",
	prepend: "afterBegin",
	append: "beforeEnd",
	after: "afterEnd"
}, (name, pos) => {
	$.fn[name] = function (html) {
		let pre = ["before", "prepend"].indexOf(name) > -1,
			arr = [],
			i = this.length;

		if ($.isFunction(html)) {
			arr = getVal(this, html, obj => obj.innerHTML);

		// multiple arguments containing nodes
		} else {
			const elems = $();
			$.each(arguments, (i, arg) => elems.add(arg));
			while (i--) {
				arr[i] = i ? elems.clone() : elems;
			}
		}

		i = this.length;
		while (i--) {
			let backwards = arr[i].length, // for counting down
				forwards = -1; // for counting up
			while (pre ? backwards-- : ++forwards < backwards) { // insert forwards or backwards?
				this[i].insertAdjacentElement(pos, arr[i][pre ? backwards : forwards]);
			}
		}
		return this;
	};
});

$.each({
	insertBefore: "before",
	prependTo: "prepend",
	appendTo: "append",
	insertAfter: "after"
}, (name, func) => {
	$.fn[name] = function (selector) {
		let i = this.length,
			obj = $(selector);

		while (i--) {
			obj[func](this[i]);
		}
		return this;
	};
});

["remove", "detach"].forEach(func => {
	$.fn[func] = function (selector) {
		let i = this.length,
			nodes = [];

		// detach selected nodes
		while (i--) {
			if (!selector || filterNodes(this[i], selector).length) {
				nodes.push(this[i].parentNode.removeChild(this[i]));
			}
		}

		// create a new dabby object to return
		return func === "detach" ? $(nodes) : this;
	};
});

["replaceWith", "replaceAll"].forEach(name => {
	$.fn[name] = function (html) {
		const all = name === "replaceAll",
			source = all ? $(html) : this;
		let target = all ? this : html,
			isFunc = $.isFunction(target),
			i = source.length;

		if (!isFunc) {
			target = $(target);
		}

		while (i--) {
			let n = target.length,
				parent = source[i].parentNode;
			while (n--) {
				const replace = isFunc ? getVal(target[n], n, target[n]) : target[n];
				if (n) {
					source[i].insertAdjacentElement("beforebegin", replace.cloneNode(true));
				} else {
					source[i] = parent.replaceChild(i ? replace.cloneNode(true) : replace, source[i]);
				}
			}
		}
		return this;
	};
});

$.fn.slice = function (start, end) {
	return $(this.get().slice(start, end));
};

$.fn.text = function (text) {
	let i = this.length,
		output = [];

	// set
	if (text !== undefined) {
		const values = getVal(this, text, obj => obj.textContent);
		while (i--) {
			this[i].textContent = values[i];
		}
		return this;
	}

	// get
	while (i--) {
		output[i] = this[i].textContent;
	}
	return output.join(" ");
};

$.fn.unwrap = function (selector) {
	this.parent(selector).not("body").each((key, obj) => {
		$(obj.children).each((i, node) => {
			obj.parentNode.insertBefore(node, obj);
		});
		obj.parentNode.removeChild(obj);
	});
	return this;
};

$.fn.wrapAll = function (html) {
	if (this[0]) {
		if ($.isFunction(html)) {
			html = html.call(this[0]);
		}

		// set variables
		let len = this.length,
			i = 0,
			node = $(html)[0].cloneNode(true);

		// insert clone into parent
		this[0].parentNode.insertBefore(node, null);

		// find innermost child of node
		while (node.firstElementChild) {
			node = node.firstElementChild;
		}

		// attach nodes to the new node
		for (; i < len; i++) {
			node.appendChild(this[i]);
		}
	}
	return this;
};

$.fn.wrap = function (html) {
	let i = this.length,
		values = getVal(this, html);

	while (i--) {
		$(this[i]).wrapAll(values[i]);
	}
	return this;
};

$.fn.children = function (selector) {
	let nodes = [],
		i = this.length;

	while (i--) {
		nodes = nodes.concat(Array.from(this[i].children));
	}

	// filter nodes by selector
	return $(selector ? filterNodes(nodes, selector) : nodes);
};

$.fn.closest = function (selector, context) {
	let i = this.length,
		nodes = [],
		parents,
		node;

	while (i--) {
		parents = [];
		node = this[i];
		while (node && node.nodeType === Node.ELEMENT_NODE) {
			parents.push(node);
			node = node.parentNode;
		}
		parents = filterNodes(parents, selector, context);
		if (parents[0]) {
			nodes.push(parents[0]);
		}
	}
	return $(nodes);
};

$.fn.eq = function (i) {
	return $(this[i < 0 ? i + this.length : i]);
};

$.fn.find = function (selector) {
	return $(selector, this);
};

$.fn.first = function () {
	return $(this[0]);
};

$.fn.has = function (selector) {
	return $(this.get().filter(node => !!$(selector, node).length));
};

$.fn.index = function (selector) {

	if (this[0]) {
		let nodes,
			subject = this[0],
			i;

		// if no selector, match against first elements siblings
		if (selector === undefined) {
			nodes = this[0].parentNode.children;

		// if selector is string, match first node in current collection against resulting collection
		} else if (typeof selector === "string") {
			nodes = $(selector);

		// if element or collection match the element or first node against current collection
		} else {
			nodes = this;
			subject = $(selector)[0];
		}

		i = nodes.length;
		while (i--) {
			if (nodes[i] === subject) {
				return i;
			}
		}
	}
	return -1;
};

$.fn.last = function () {
	return this.eq(-1);
};

["next", "nextAll", "nextUntil", "prev", "prevAll", "prevUntil"].forEach(func => {
	$.fn[func] = function (selector, filter) {
		const next = func.indexOf("x") > -1,
			all = func.indexOf("A") > -1,
			until = func.indexOf("U") > -1,
			method = next ? "nextElementSibling" : "previousElementSibling";
		let nodes = [],
			i = this.length,
			sibling;

		// look through each node and get siblings
		while (i--) {
			sibling = this[i][method];
			while (sibling) {
				nodes.push(sibling);
				if (all || (until && filterNodes(sibling, selector).length)) {
					break;
				} else {
					sibling = sibling[method];
				}
			}
		}

		// swap args for *Until methods
		if (until) {
			selector = filter;
		}

		// return new collection
		return $(selector ? filterNodes(nodes, selector) : nodes);
	};
});

$.fn.siblings = function (selector) {
	let i = this.length,
		nodes = [];

	while (i--) {
		Array.from(this[i].parentNode.children).forEach(child => {
			if (child !== this[i]) {
				nodes.push(child);
			}
		});
	}
	return $(selector ? filterNodes(nodes, selector) : nodes);
};

// ajax
// attributes
// core
// dimensions
// events
// manipulation
// traversal
// utilities
//import "./utils/isarray/isarray.js";

export default $;
