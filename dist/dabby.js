/*! dabbyjs v0.9.6 by Will Earp - https://github.com/hexydec/dabby */

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
			const obj = document.createElement("template");
			obj.innerHTML = selector;
			nodes = obj.content ? obj.content.children : obj.children;
		}
	}
	return new dabby(nodes);
};

// alias functions
$.fn = $.prototype;

$.each = (obj, callback) => {
	const keys = Object.keys(obj),
		len = keys.length;

	for (let i = 0; i < len; i++) {
		if (callback.call(obj[keys[i]], keys[i], obj[keys[i]]) === false) {
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
	    if (typeof Object.getPrototypeOf == 'function') {
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
					const keys = Object.keys(source),
						len = keys.length;
					for (let i = 0; i < len; i++) {

						// merge recursively if source is object, if target is not object, overwrite
						if ($.isPlainObject(source[keys[i]])) {
							target[keys[i]] = $.isPlainObject(target[keys[i]]) ? merge(target[keys[i]], source[keys[i]]) : source[keys[i]];

						// when source property is value just overwrite
						} else {
							target[keys[i]] = source[keys[i]];
						}
					}
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

$.isArray = arr => Array.isArray(arr);

$.param = obj => {
	let params = [],
		add = (key, value, params) => {
			let isArr = $.isArray(value);
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
		password: null
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
						callback.apply(settings.context, callback === settings.complete ? [null, value] : [response, value]);
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
			callback = (xhr, status) => {
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
				[settings.statusCode[xhr.status], settings[status], settings.complete].forEach((callback, i) => {
					if (callback) {
						callback.apply(settings.context, i < 2 ? [response, status, xhr] : [xhr, status]);
					}
				});
			};

		// callbacks
		xhr.onload = () => {
			const types = {
				200: "success",
				204: "nocontent",
				304: "notmodified"
			};
			callback(xhr, types[xhr.status] || "error");
		};
		xhr.ontimeout = () => {
			callback(xhr, "timeout");
		};
		xhr.onabort = () => {
			callback(xhr, "abort");
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

	// function
	if ($.isFunction(filter)) {
		func = filter;

	// nodes
	} else {

		// normalise filters
		if (typeof(filter) === "string") {
			filter = [filter];
		} else {
			filter = Array.from($(filter, context));
		}

		// filter function
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
	return nodes.filter((item, i) => func.call(item, i, item) !== Boolean(not), nodes);
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

				// set HTML to nodes in collection
				while (i--) {
					this[i].innerHTML = html;

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
		funcCurrent = $.isFunction(current);
	while (i--) {
		values[i] = funcVal ? val.call(obj[i], i, funcCurrent ? current(obj[i]) : current) : val;
	}
	return values;
}

$.map = (obj, callback) => {
	const keys = Object.keys(obj),
		len = keys.length;
	let arr = [],
		i = 0,
		result;

	for (; i < len; i++) {
		result = callback.call(window, obj[keys[i]], keys[i]);
		if (![null, undefined].indexOf(result) > -1) {
			arr.push(result);
		}
	}
	return arr;
};

$.fn.val = function (value) {

	// set value
	if (value !== undefined) {
		let i = this.length,
			values = getVal(this, value, obj => obj.val());

		while (i--) {

			// string value, just set to value attribute
			if (!$.isArray(values[i])) {
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
				if (!$.isArray(params)) {
					params = [];
				}
				params = params.concat($.isArray(value) ? value : [value]);
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
				nodes.push(parent);
				if (!all || (until && filterNodes(parent, selector).length)) {
					break;
				} else {
					parent = parent.parentNode;
				}
			}
		}
		if (selector) {
			nodes = filterNodes(nodes, selector);
		}
		return $(nodes);
	};
});

$.fn.get = function (i) {
	return i === undefined ? Array.from(this) : this[i >= 0 ? i : i + this.length];
};

// add and remove event handlers
["on", "one"].forEach(name => {
	$.fn[name] = function (events, selector, data, callback) {
		let i = this.length;

		events = events.split(" ");

		// sort out args
		if ($.isFunction(selector)) {
			callback = selector;
			selector = undefined;
		} else if ($.isFunction(data)) {
			callback = data;
			data = undefined;
		}

		// attach event
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
					if (data) { // set data to event object
						evt.data = data;
					}
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
		i,
		obj = {};

	// set properties
	if (isObj || value || value === null) {
		i = this.length;

		// normalise to object
		if (!isObj) {
			obj[prop] = value;
			prop = obj;
		}

		while (i--) {
			$.each(prop, (key, val) => {
				if (events.indexOf(key) > -1) {
					$(this[i]).on(key, val);
				} else if (key === "style") {
					this[i].style.cssText = val;
				} else if (key === "class") {
					this[i].className = val;
				} else if (key === "text") {
					this[i].textContent = val;
				} else if (value === null) {
					this[i].removeAttribute(key);
				} else {
					this[i].setAttribute(key, val);
				}
			});
		}
		return this;

	// retrieve properties
	} else if (this[0]) {
		if (prop === "style") {
			return this[0].style.cssText;
		}
		if (prop === "class") {
			return this[0].className;
		}
		return this[0].getAttribute(prop);
	}
};

["addClass", "removeClass", "toggleClass"].forEach(name => {
	$.fn[name] = function (cls) {

		// remove "Class" from name for classList method
		let func = name.substr(0, name.length - 5),
			i = this.length,
			values = getVal(this, cls, obj => obj.className);

		// manage classes on nodes
		while (i--) {
			if (typeof values[i] === "string") {
				values[i] = values[i].split(" ");
			}
			const len = values[i].length;
			for (let n = 0; n < len; n++) {
				this[i].classList[func](values[i][n]);
			}
		}
		return this;
	};
});

var dasherise = prop => prop.replace(/[A-Z]/g, letter => "-" + letter.toLowerCase());

var setCss = (dabby, props, value) => {

	// normalise props
	if (typeof props === "string") {
		const name = props;
		props = {};
		props[name] = value;
	}

	// prepare values
	let values = [];
	$.each(props, (i, prop) => {
		values[i] = getVal(dabby, prop, obj => obj.style[i]);
	});

	// set properties
	$.each(values, (key, val) => {
		let i = dabby.length;
		while (i--) {
			if (!isNaN(val)) {
				val += "px";
			}
			dabby[i].style[value === "" ? "removeProperty" : "setProperty"](dasherise(key), val);
		}
	});
	return dabby;
}

var camelise = prop => prop.replace(/-([a-z])/gi, (text, letter) => letter.toUpperCase());

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
		let values = [];
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
			this[i].style.display = values[n] || (getComputedStyle(this[i])["display"] === "none" ? "block" : "none");
		}
		return this;
	};
});

$.fn.map = function (callback) {
	const len = this.length;
	let values = [],
		i = 0;

	for (; i < len; i++) {
		values.push(callback.call(this[i], i, this[i]));
	}
	return values;
};

$.fn.offset = function (coords) {
	const doc = document.documentElement;
	let rect,
		i = this.length,
		pos;

	// set
	if (coords) {
		const values = getVal(this, coords, obj => obj.offset()); // copy the object
		while (i--) {
			// if coords is callback, generate value

			rect = this[i].getBoundingClientRect();
			const itemCoords = Object.create(values[i]); // copy the object

			if (itemCoords.top !== undefined && itemCoords.left !== undefined) {
				let style = getComputedStyle(this[i]);
				pos = style["position"];

				// set position relative if static
				if (pos === "static") {
					this[i].style.position = "relative";
				}

				// add current offset
				itemCoords.top += parseFloat(style["top"]) || 0;
				itemCoords.left += parseFloat(style["left"]) || 0;

				// remove parent offset and viewport scroll
				if (pos !== "fixed") {
					itemCoords.top -= doc.scrollTop + rect.top;
					itemCoords.left -= doc.scrollLeft + rect.left;
				}

				// set offset
				this[i].style.top = itemCoords.top + "px";
				this[i].style.left = itemCoords.left + "px";
			}
		}
		return this;
	}

	// get
	if (this[0]) {
		pos = this[0].style.position === "fixed";
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

		// set
		if (pos !== undefined) {
			let i = this.length,
				tl = item.indexOf("Top") > -1 ? "top" : "left",
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
				item = item === "scrollTop" ? "pageYOffset" : "pageXOffset";
			}
			return this[0][item];
		}
	};
});

["width", "height", "innerWidth", "innerHeight", "outerWidth", "outerHeight"].forEach(dim => {

	const getAdditionalLength = (style, wh, props) => {
		let i = props.length,
			value = 0,
			suffix;

		while (i--) {
			suffix = props[i] === "border" ? "Width" : "";
			value += parseFloat(style[props[i] + (wh === "width" ? "Left" : "Top") + suffix]) || 0;
			value += parseFloat(style[props[i] + (wh === "width" ? "Right" : "Bottom") + suffix]) || 0;
		}
		return value;
	};

	$.fn[dim] = function (val) {
		const valtype = typeof(val),
			wh = dim.toLowerCase().indexOf("width") > -1 ? "width" : "height", // width or height
			io = dim.indexOf("inner") > -1 ? "inner" : (dim.indexOf("outer") > -1 ? "outer" : ""); // inner outer or neither
		let i = this.length,
			value,
			whu,
			props,
			param,
			style;

		// set value
		if (val !== undefined && valtype !== "boolean") {
			const values = getVal(this, val, obj => obj[dim]);
			while (i--) {

				// add additional lengths
				if (io) {
					style = getComputedStyle(this[i]);

					// convert to px if other unit
					if (isNaN(values[i]) && values[i].indexOf("px") === -1) {
						this[i].style[wh] = values[i];
						values[i] = style[wh];
					}

					// take off px
					values[i] = parseFloat(values[i]);

					// get additional length
					props = ["padding"];
					if (io === "outer") {
						props.push("border");
					}
					values[i] -= getAdditionalLength(style, wh, props);
				}
				this[i].style[wh] = values[i] + (isNaN(values[i]) ? "" : "px");
			}
			return this;
		}

		// get value
		if (this[0]) {
			whu = wh === "width" ? "Width" : "Height";

			// document
			if (this[0].nodeType === Node.DOCUMENT_NODE) {
				return this[0].documentElement["scroll" + whu];
			}

			// element
			if (!$.isWindow(this[0])) {
				param = io === "outer" ? "offset" : "client";
				value = this[0][param + whu];

				// add padding on, or if outer and margins requested, add margins on
				if (io === "" || (io === "outer" && val === true)) {
					style = getComputedStyle(this[0]);
					value += getAdditionalLength(style, wh, [io ? "margin" : "padding"]) * (io ? 1 : -1); // add margin, minus padding
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
	const evt = new CustomEvent(name, {bubbles: true, cancelable: true});
	let i = this.length;

	// copy extra data to event object
	if (data) {
		evt.args = data;
	}
	while (i--) {
		if ($.isFunction(this[i][name])) {
			this[i][name]();
		} else {
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
	let i = this.length;

	events = events.split(" ");

	// sort out args
	if ($.isFunction(selector)) {
		callback = selector;
		selector = undefined;
	} else if ($.isFunction(data)) {
		callback = data;
		data = undefined;
	}

	// attach event
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
		const pre = ["before", "prepend"].indexOf(name) > -1;
		let arr = [];

		if ($.isFunction(html)) {
			arr = getVal(this, html, obj => obj.innerHTML);

		// multiple arguments containing nodes
		} else {
			const elems = $();
			$.each(arguments, (i, arg) => elems.add(arg));
			let i = this.length;
			while (i--) {
				arr[i] = i ? elems.clone() : elems;
			}
		}

		let i = this.length;
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
			isFunc = $.isFunction(target);

		if (!isFunc) {
			target = $(target);
		}

		let i = source.length;

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
	if (text === undefined) {
		while (i--) {
			output[i] = this[i].textContent;
		}
		return output.join(" ");
	} else {
		const values = getVal(this, text, obj => obj.textContent);
		while (i--) {
			this[i].textContent = values[i];
		}
		return this;
	}
};

$.fn.unwrap = function (selector) {
	this.parent(selector).not("body").each((key, obj) => {
		const parent = obj.parentNode;

		$(obj.children).each((i, node) => {
			parent.insertBefore(node, obj);
		});
		parent.removeChild(obj);
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
			node = $(html).get(0).cloneNode(true);

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
	if (selector) {
		nodes = filterNodes(nodes, selector);
	}
	return $(nodes);
};

$.fn.closest = function (selector, context) {
	let i = this.length,
		nodes = [],
		parents,
		node;

	while (i--) {
		parents = [];
		node = this[i];
		while (node) {
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
	const key = i < 0 ? i + this.length : i;
	return $(this[key] || null);
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
	let index = -1;

	if (this[0]) {
		let nodes,
			subject = this[0],
			type = typeof selector,
			i;

		// if no selector, match against first elements siblings
		if (type === "undefined") {
			nodes = this[0].parentNode.children;

		// if selector is string, match first node in current collection against resulting collection
		} else if (type === "string") {
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
	return index;
};

$.fn.last = function () {
	return this.eq(-1);
};

["next", "nextAll", "nextUntil", "prev", "prevAll", "prevUntil"].forEach(func => {
	$.fn[func] = function (selector, filter) {
		const next = func.indexOf("next") > -1,
			all = func.indexOf("All") > -1,
			until = func.indexOf("Until") > -1,
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

		// filter siblings by selector
		if (selector) {
			nodes = filterNodes(nodes, selector);
		}

		// return new collection
		return $(nodes);
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

export default $;
