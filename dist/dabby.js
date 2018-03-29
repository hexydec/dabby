/*! dabbyjs v0.9.3 by Will Earp - https://github.com/hexydec/dabby */

function camelise(prop) {
	return prop.replace(/-([a-z])/gi, (text, letter) => letter.toUpperCase());
}

function dasherise(prop) {
	return prop.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase());
}

function filterNodes(dabby, filter, context, not) {
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
				if (node[typeof(filter[i]) === "string" ? "matches" : "isSameNode"](filter[i])) {
					return true;
				}
			}
			return false;
		};
	}
	return nodes.filter((item, i) => func.call(item, i, item) !== Boolean(not), nodes);
}

function getEvents() {
	return ["focusin", "focusout", "focus", "blur", "resize", "scroll", "unload", "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave", "contextmenu", "change", "select", "keydown", "keypress", "keyup", "error", "submit"];
}

function getProp(prop) {
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

function getVal(val, obj, i) {

	// retrieve as function
	if ($.isFunction(val)) {
		val = val.apply(obj, Array.from(arguments).slice(2)); // pass extra arguments on
	}
	return val;
}

function setCss(dabby, props, value) {

	// set vars
	let name = props,
		keys,
		k,
		remove;

	// normalise props
	if (typeof props === "string") {
		props = {};
		props[name] = value;
	}

	// cache properties for loop
	keys = Object.keys(props);
	k = keys.length;

	// set properties
	while (k--) {
		let i = dabby.length;
		while (i--) {
			let val = props[keys[k]] === "" ? undefined : getVal(props[keys[k]], dabby[i], k, dabby[i].style[keys[k]]);
			if (typeof val === "number") {
				val += "px";
			}
			dabby[i].style[remove ? "removeProperty" : "setProperty"](dasherise(keys[k]), val);
		}
	}
	return dabby;
}

const dabby = function (selector, context) {
	let nodes = [],
		match,
		obj;

	// enables new object to be created through $()
	if (!(this instanceof dabby)) {
		return new dabby(selector, context);

	// if no selector, return empty colletion
	} else if (selector) {

		// $ collection
		if (selector instanceof dabby) {
			return selector;

		// single node
		} else if (selector.nodeType || $.isWindow(selector)) {
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
			context = context || document;
			$(context).each((i, obj) => {
				nodes = nodes.concat(Array.from(obj.querySelectorAll(selector)));
			});

		// create a single node and attach properties
		} else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {
			nodes.push(document.createElement(match[1]));

			// context is CSS attributes
			if (context instanceof Object) {
				obj = $(nodes);
				$.each(context, (prop, value) => {
					obj.attr(prop, value);
				});
			}

		// parse HTML into nodes
		} else {
			//nodes = (context || doc).createRange().createContextualFragment(selector).childNodes; // not supported in iOS 9
			obj = document.createElement("template");
			obj.innerHTML = selector;
			nodes = obj.content ? obj.content.children : obj.children;
		}
	}

	// build nodes
	this.length = 0;
	Array.from(nodes).forEach(node => { // HTMLCollection objects don't support forEach
		if ([1, 9, 11].indexOf(node.nodeType) > -1 || $.isWindow(node)) { // only element, document, documentFragment and window
			this[this.length++] = node;
		}
	});
	return this;
},
	$ = dabby; // alias in this scope

// alias functions
dabby.fn = dabby.prototype;

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
	settings = $.extend({
		method: "GET",
		cache: null, // start will null so we can see if explicitly set
		data: null,
		dataType: null, // only changes behavior with json, jsonp, script
		processData: true,
		async: true,
		crossDomain: false,
		scriptCharset: null,
		jsonp: "callback",
		jsonpCallback: "dabby" + Date.now(),
		headers: {
			"X-Requested-With": "XMLHttpRequest",
			"Content-Type": settings.contentType || "application/x-www-form-urlencoded; charset=UTF-8"
		},
		context: null,
		statusCode: {},
		username: null,
		password: null
	}, settings);

	// determine datatype
	if (!settings.dataType && /\.js($|\?)/.test(settings.url)) {
		settings.dataType = "script";
	}

	let sync = ["script", "jsonp"].indexOf(settings.dataType) > -1,
		script, xhr;

	// add cache buster
	if (settings.cache || (settings.cache === null && sync)) {
		settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + "_=" + (+new Date());
	}

	// add data to query string
	if (settings.data && settings.processData) {
		settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + (typeof settings.data === "string" ? settings.data : $.param(settings.data));
	}

	// fetch script
	if (sync || settings.crossDomain) {
		script = document.createElement("script");
		if (settings.scriptCharset) {
			script.charset = settings.scriptCharset;
		}

		// add callback parameter
		if (settings.dataType === "jsonp") {
			settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + settings.jsonp + "=" + settings.jsonpCallback;
		}

		// setup event callbacks
		$.each({
			load: "success",
			error: "error"
		}, (key, value) => {
			script.addEventListener(key, () => {
				let response = settings.dataType === "jsonp" ? window[settings.jsonpCallback] || null : null;
				[settings[value], settings.complete].forEach(callback => {
					if (callback) {
						callback.apply(settings.context, callback === settings.complete ? [null, value] : [response, value]);
					}
				});
			});
		});

		script.src = settings.url;
		document.head.appendChild(script);

	// make xhr request
	} else {
		const callback = (xhr, status) => {
			let response = xhr.responseText,
				callbacks = [];

			// parse JSON
			if (["json", null].indexOf(settings.dataType) > -1) {
				try {
					response = JSON.parse(response);
				} catch (e) {
					// do nothing
				}
			}

			// run callbacks
			[settings.statusCode[xhr.status], settings[status], settings.complete].forEach(callback => {
				if (callback) {
					callback.apply(settings.context, callback === settings.complete ? [xhr, status] : [response, status, xhr]);
				}
			});
		};

		// create XHR object
		xhr = new XMLHttpRequest();
		xhr.open(settings.method, settings.url, settings.async);

		// add authoisation header
		if (settings.username) {
			settings.headers.Authorization = btoa(settings.username + ":" + settings.password);
		}

		// headers
		$.each(settings.headers, (key, value) => {
			xhr.setRequestHeader(key, value);
		});

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
		xhr.send(settings.processData ? undefined : settings.data);
		return xhr;
	}
};

$.get = (url, data, success, type) => {
	const isFunc = data && $.isFunction(data);
	return $.ajax(typeof(url) === "object" ? url : {
		url: url,
		data: isFunc ? {} : data,
		success: isFunc ? data : success,
		dataType: isFunc ? success : type
	});
};

$.getScript = (url, success) => $.ajax({
	url: url,
	dataType: "script",
	success: success
});

$.fn.load = function (url, data, success) {
	if (this[0]) {

		// get selector from URL
		const [uri, selector] = url.split(" ", 2);

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
		})
	}
	return this;
};

$.param = obj => {
	let params = [],
		add = (key, value, params) => {
			let isArr = $.isArray(value);
			if (isArr || typeof value === "object") {
				$.each(value, (i, val) => {
					params = add(key + "[" + (isArr ? "" : i) + "]", val, params);
				});
			} else {
				params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
			}
			return params;
		};

	// process values
	$.each(obj, (key, item) => {
		params = add(key, item, params);
	});
	return params.join("&");
};

$.get = (url, data, success, type) => {
	const isFunc = $.isFunction(data);
	let settings = typeof(url) === "object" ? url : {
		url: url,
		data: isFunc ? {} : data,
		success: isFunc ? data : success,
		dataType: isFunc ? success : type
	};
	settings.type = "POST";
	return $.ajax(settings);
};

$.fn.serialize = function () {
	const selector = "input[name]:not([type=file]):not([type=submit]),textarea[name],select[name]",
		obj = this.is(selector) ? this.filter(selector) : $(selector, this),
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

	let params = {};

	// process values
	obj.each((key, obj) => {
		const value = $(obj).val();
		if (!obj.disabled && value !== undefined) {
			params = add(obj.getAttribute("name"), value, params);
		}
	});
	return $.param(params);
};

$.fn.attr = function (prop, value) {
	let isArr = $.isArray(prop),
		i,
		events,
		arr = {};

	// set properties
	if (isArr || value || value === null) {
		i = this.length,
		events = getEvents();

		// normalise to array
		if (!isArr) {
			arr[prop] = value;
			prop = arr;
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
			i = this.length;

		// manage classes on nodes
		while (i--) {
			let arr = getVal(cls, this[i], i, this[i].className);
			if (typeof arr === "string") {
				arr = arr.split(" ").reverse(); // reverse as we add them backwards
			} else {
				arr = arr.reverse();
			}
			let n = arr.length;
			while (n--) {
				this[i].classList[func](arr[n]);
			}
		}
		return this;
	};
});

$.fn.css = function (props, value) {

	// set the values
	if (value !== undefined || $.isPlainObject(props)) {
		return setCss(this, props, value);

	// retrieve value from first property
	} else if (this[0]) {
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
			output[props[i]] = style.getPropertyValue(dasherise(props[i]));
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

	// get value
	} else if (this[0] && this[0].dataset) {
		let parse = value => {
			try {
				return JSON.parse(value);
			} catch (e) {
				return value;
			}
		}

		// all properties
		if (name === undefined) {
			let arr = {};
			$.each(this[0].dataset, (key, value) => {
				arr[key] = parse(value);
			});
			return arr;

		// retrieve specific property
		} else {
			name = camelise(name);
			if (this[0].dataset.hasOwnProperty(name)) {
				return parse(this[0].dataset[name]);
			}
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
}

$.fn.prop = function (prop, value) {
	prop = getProp(prop);

	// set
	if (value !== undefined) {
		let i = this.length;
		while (i--) {
			this[i][prop] = value;
		}
		return this;

	// get
	} else if (this[0]) {
		return this[0][prop];
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

$.fn.val = function (value) {

	// set value
	if (value !== undefined) {
		let i = this.length,
			val;
		while (i--) {
			if (this[i].multiple) {
				val = $.map(
					$.isArray(value) ? value : [value],
					item => String(item)
				);
				$("option", this[i]).each((key, obj) => {
					obj.selected = val.indexOf(String(obj.value)) > -1;
				});
			} else {
				this[i].value = String(value);
			}
		}
		return this;

	// read value from first node
	} else if (this[0]) {

		// get multiple values
		if (this[0].multiple) {
			let values = [];
			$("option", this[0]).each((key, obj) => {
				if (obj.selected) {
					values.push(String(obj.value));
				}
			});
			return values;

		// get radio box value
		} else if (this[0].type === "radio") {
			let obj = this.filter("[name='" + this[0].name + "']:checked")[0];
			return obj ? String(obj.value) : undefined;

		// get single value
		} else if (this[0].type !== "checkbox" || this[0].checked) {
			return String(this[0].value);
		}
	}
};

$.fn.each = function (callback) {
	$.each(Array.from(this), callback);
	return this;
};

$.fn.get = function (i) {
	return i === undefined ? Array.from(this) : this[i >= 0 ? i : i + this.length];
};

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
		pos,
		parent;

	// set
	if (coords) {
		while (i--) {

			// if coords is callback, generate value
			rect = this[i].getBoundingClientRect();
			coords = getVal(coords, i, rect);

			if (coords.top !== undefined && coords.left !== undefined) {

				// set position relative if static
				pos = this[i].style.position || "static";
				if (pos === "static") {
					this[i].style.position = "relative";
				}

				// set offset
				this[i].style.top = (parseFloat(coords.top) - (pos === "fixed" ? 0 : doc.scrollTop + rect.top)) + "px";
				this[i].style.left = (parseFloat(coords.left) - (pos === "fixed" ? 0 : doc.scrollLeft + rect.left)) + "px";
			}
		}
		return this;

	// get
	} else if (this[0]) {
		pos = this[0].style.position;
		rect = this[0].getBoundingClientRect();
		return {
			top: rect.top - (pos === "fixed" ? 0 : doc.scrollTop),
			left: rect.left - (pos === "fixed" ? 0 : doc.scrollLeft)
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
			let i = this.length;
			while (i--) {
				this[i][item] = pos;
			};
			return this;

		// get
		} else if (this[0]) {
			return this[0][item];
		}
	};
});

["width", "height", "innerWidth", "innerHeight", "outerWidth", "outerHeight"].forEach(dim => {

	const getAdditionalLength = (obj, wh, props) => {
		const style = getComputedStyle(obj);
		let i = props.length,
			value = 0,
			suffix;

		while (i--) {
			suffix = props[i] === "border" ? "-width" : "";
			value += parseFloat(style.getPropertyValue(props[i] + (wh === "width" ? "-left" : "-top") + suffix)) || 0;
			value += parseFloat(style.getPropertyValue(props[i] + (wh === "width" ? "-right" : "-bottom") + suffix)) || 0;
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
			param;

		// set value
		if (val !== undefined && valtype !== "boolean") {
			while (i--) {
				value = getVal(val, this[i], i);
				if (io) {
					props = ["padding"];
					if (io === "outer") {
						props.push("border");
					}
					value -= getAdditionalLength(this[i], wh, props);
				}
				if (!isNaN(val)) {
					value += "px";
				}
				this[i].style[wh] = value;
			}
			return this;

		// get value
		} else if (this[0]) {
			whu = wh === "width" ? "Width" : "Height";

			// document
			if (this[0].nodeType === Node.DOCUMENT_NODE) {
				return this[0].documentElement["scroll" + whu];

			// element
			} else if (!$.isWindow(this[0])) {
				param = io === "outer" ? "offset" : "client";
				value = this[0][param + whu];

				// add padding on, or if outer and margins requested, add margins on
				if (io === "" || (io === "outer" && val === true)) {
					value -= getAdditionalLength(this[0], wh, [io === "" ? "padding" : "margin"]);
				}
				return value;

			// window
			} else if (io === "inner") {
				return this[0].document.documentElement["client" + whu];
			} else {
				return this[0]["inner" + whu];
			}
		}
	};
});

getEvents().forEach(event => {
	$.fn[event] = function (data, callback) {
		return data ? this.on(event, data, callback) : this.trigger(event);
	};
});

// add and remove event handlers
["on", "one", "off"].forEach(name => {
	$.fn[name] = function (events, selector, data, callback) {
		let i = this.length,
			fn = ;

		events = events.split(" ");

		// sort out args
		if ($.isFunction(selector)) {
			callback = selector;
			selector = null;
		} else if ($.isFunction(data)) {
			callback = data;
			data = null;
		}

		// attach event
		while (i--) {
			let node = this[i],
				e = events.length;

			// record the original function
			if (name !== "off") {
				if (!node.events) {
					node.events = [];
				}
				node.events.push({
					events: events,
					callback: callback,
					selector: selector,
					func: function (evt) { // delegate function
						let target = [this];
						if (selector) {
							let t = $(evt.target);
							target = t.add(t.parents(selector)).get(); // is the selector in the targets parents?
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
					}
				});

				// trigger
				while (e--) {
					node.addEventListener(events[e], node.events.func, {once: name === "one", capture: !!selector});
				}

			// find the original function
			} else if (node.events.length) {
				while (e--) {
					node.events.forEach((evt, i) => {
						const index = evt.events.indexOf(events[e]);
						if (index !== -1 && evt.callback === callback && evt.selector === selector) {
							node.removeEventListener(events[e], evt.func, {capture: !!evt.selector}); // must pass same arguments
							node.events[i].events.splice(index, 1);
							if (!node.events[i].events.length) {
								node.events.splice(i, 1);
							}
						}
					});
				}
			}
		}
		return this;
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
		this[i].dispatchEvent(evt);
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
		this[i].innerHTML = "";
	}
	return this;
};

$.fn.html = function (html) {

	// set
	if (html !== undefined) {
		let i = this.length;
		while (i--) {
			this[i].innerHTML = getVal(html, this[i], i);
		}
		return this;

	// get
	} else if (this[0]) {
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
		const pre = ["before", "prepend"].indexOf(name) > -1,
			isFunc = $.isFunction(html);
		let i = this.length,
			elems = $();

		if (!isFunc) { // multiple arguments containing nodes?
			$.each(arguments, (i, arg) => {
				elems.add(arg);
			});
		}

		while (i--) {
			if (isFunc) {
				elems = $(getVal(html, this[i], i, this[i].innerHTML));
			}
			let backwards = elems.length, // for counting down
				forwards = -1; // for counting up
			while (pre ? backwards-- : ++forwards < backwards) { // insert forwards or backwards?
				let obj = elems[pre ? backwards : forwards];

				// clone if i !== 0
				if (i) {
					obj = obj.cloneNode(true);
				}
				this[i].insertAdjacentElement(pos, obj);
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
			nodes = [],
			obj = [];

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

// needs more understanding of how this is supposed to work!!!

/*["replaceWith", "replaceAll"].forEach(function (name) {
	$.fn[name] = function (html) {
		const all = name === "replaceAll",
			isFunc = $.isFunction(html)
		let i = this.length,
			nodes = [],
			replace = [],
			n,
			parent;

		if (!isFunc) {
			html = $(html);
		}
		while (i--) {

			replace = isFunc ? getVal(html, i, this[i]) : html;
			n = replace.length;
			parent = this[i].parentNode;
			while (n--) {
				if (n) {
					this[i].insertAdjacentElement("beforebegin", replace.get(n));
				} else {
					nodes[i] = parent.replaceChild(replace.get(n), this[i]);
				}
			}
		}
		return all ? this : nodes;
	};
});*/

$.fn.slice = function (start, end) {
	return $(this.get().slice(start, end));
};

$.fn.text = function (text) {
	const get = text === undefined;
	let len = this.length,
		output = [],
		i = 0;
	for (; i < len; i++) {
		if (get) {
			output.push(this[i].textContent);
		} else {
			this[i].textContent = getVal(text, this[i], i);
		}
	}
	return get ? output.join(" ") : this;
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

$.fn.wrap = function (html) {
	let i = this.length;

	while (i--) {
		$(this[i]).wrapAll(getVal(html, this[i], i));
	}
	return this;
}

$.fn.wrapAll = function (html) {
	if (this[0]) {

		// set variables
		let len = this.length,
			i = 0,
			node = $(getVal(html, this[0]))[0].cloneNode(true);

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
}

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
	let key = i < 0 ? i + this.length : i;
	return $(this[key] || null);
};

["filter", "not"].forEach(name => {
	$.fn[name] = function (selector) {
		return $(filterNodes(this, selector, name === "not"));
	};
});

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
			if (nodes[i].isSameNode(subject)) {
				return i;
			}
		}
	}
	return index;
};

$.fn.is = function (selector) {
	return !!filterNodes(this, selector).length;
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
	}
});

$.fn.siblings = function (selector) {
	let i = this.length,
		nodes = [];

	while (i--) {
		Array.from(this[i].parentNode.children).forEach(child => {
			if (!child.isSameNode(this[i])) {
				nodes.push(child);
			}
		});
	}
	return $(selector ? filterNodes(nodes, selector) : nodes);
};

$.extend = (obj, ...arrs) => {
	const len = arrs.length;
	let i = 0,
		keys,
		k;

	for (; i < len; i++) {
		keys = Object.keys(arrs[i]);
		k = keys.length;
		while (k--) {
			obj[keys[k]] = arrs[i][keys[k]];
		}
	}
	return obj;
};

$.isArray = arr => Array.isArray(arr);

$.isFunction = func => func && func.constructor === Function;

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

$.isWindow = obj => obj !== null && obj === obj.window;

$.map = (obj, callback) => {
	const keys = Object.keys(obj),
		len = keys.length;
	let arr = [],
		i = 0,
		result;

	for (; i < len; i++) {
		result = callback.call(window, obj[keys[i]], keys[i])
		if (![null, undefined].indexOf(result) > -1) {
			arr.push(result);
		}
	}
	return arr;
};

export default $;

//# sourceMappingURL=dabby.js.map