/*! Dabby.js v0.9.0 - 2018-01-30 by Will Earp */

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(function() {
			return factory(global);
		});
	} else if (typeof exports !== "undefined") {
		module.exports = factory(global);
	} else if (!global.$) {
		global.$ = factory(global);
	}
}(this || window, window => {
	"use strict";

	function camelise(prop) {
		return prop.replace(/-([a-z])/gi, (text, letter) => letter.toUpperCase());
	}
	
	function dasherise(prop) {
		return prop.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase());
	}
	
	function filterNodes(dabby, filter, not) {
		let func,
			nodes = Array.from(dabby);
	
		// function
		if ($.isFunction(filter)) {
			func = filter;
	
		// nodes
		} else {
			filter = $(filter).get();
			func = node => {
				let i = filter.length;
				while (i--) {
					if (node.isSameNode(filter[i])) {
						return true;
					}
				}
				return false;
			};
		}
		return nodes.filter(not ? function (item) {return !func.call(this, item);} : func, nodes);
	}
	
	function getEvents() {
		return ["focusin", "focusout", "focus", "blur", "resize", "scroll", "unload", "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave", "change", "select", "keydown", "keypress", "keyup", "error", "submit"];
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
			i,
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
			i = dabby.length;
			while (i--) {
				remove = props[keys[k]] === "";
				dabby[i].style[remove ? "removeProperty" : "setProperty"](
					dasherise(keys[k]),
					remove ? undefined : getVal(props[keys[k]], dabby[i], k)
				);
			}
		}
		return dabby;
	}
	
	let domready = false,
		dabby = function (selector, context) {
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
				} else if (selector.nodeType) {
					nodes = [selector];
	
				// ready function
				} else if ($.isFunction(selector)) {
					if (domready) {
						selector.call(document, $);
					} else {
						document.addEventListener("DOMContentLoaded", () => {
							selector.call(document, $);
							domready = true;
						}, {once: true});
					}
	
				// array|NodeList|HTMLCollection of nodes
				} else if (typeof selector !== "string") {
					nodes = selector;
	
				// CSS selector
				} else if (!selector.includes("<")) {
					context = context || document;
					$(context).each(function () {
						nodes = nodes.concat(Array.from(this.querySelectorAll(selector)));
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
					nodes = obj.content ? obj.content.childNodes : obj.childNodes;
				}
			}
	
			// build nodes
			this.length = 0;
			Array.from(nodes).forEach(node => { // HTMLCollection objects don't support forEach
				if ([1, 9, 11].includes(node.nodeType)) { // only element, document and documentFragment
					this[this.length++] = node;
				}
			});
			return this;
		},
		$ = dabby; // alias in this scope
	
	// alias functions
	dabby.fn = dabby.prototype;
	
	$.each = function (obj, callback) {
		const keys = Object.keys(obj),
			len = keys.length;
	
		for (let i = 0; i < len; i++) {
			if (callback.call(obj[keys[i]], keys[i], obj[keys[i]]) === false) {
				break; // stop if callback returns false
			}
		}
		return obj;
	};
	
	$.ajax = function (url, settings) {
	
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
	
		let sync = ["script", "jsonp"].includes(settings.dataType),
			script, xhr;
	
		// add cache buster
		if (settings.cache || (settings.cache === null && sync)) {
			settings.url += (settings.url.includes("?") ? "&" : "?") + "_=" + (+new Date());
		}
	
		// add data to query string
		if (settings.data && settings.processData) {
			settings.url += (settings.url.includes("?") ? "&" : "?") + $.param(settings.data);
		}
	
		// fetch script
		if (sync || settings.crossDomain) {
			script = document.createElement("script");
			if (settings.scriptCharset) {
				script.charset = settings.scriptCharset;
			}
	
			// add callback parameter
			if (settings.dataType === "jsonp") {
				settings.url += (settings.url.includes("?") ? "&" : "?") + settings.jsonp + "=" + settings.jsonpCallback;
			}
	
			// setup event callbacks
			$.each({
				load: "success",
				error: "error"
			}, function (key, value) {
				script.addEventListener(key, function () {
					var response = settings.dataType === "jsonp" ? window[settings.jsonpCallback] || null : null;
					[value, "complete"].forEach(function (name) {
						if (settings[name]) {
							settings[name].call(settings.context, response, value === "success" ? 200 : 400);
						}
					});
				});
			});
	
			script.src = settings.url;
			document.head.appendChild(script);
	
		// make xhr request
		} else {
	
			// create XHR object
			xhr = new XMLHttpRequest();
			xhr.open(settings.method, settings.url, settings.async);
	
			// add authoisation header
			if (settings.username) {
				settings.headers.Authorization = btoa(settings.username + ":" + settings.password);
			}
	
			// headers
			$.each(settings.headers, function (key, value) {
				xhr.setRequestHeader(key, value);
			});
	
			// callbacks
			xhr.onreadystatechange = function () {
				if (this.readyState === 4) {
					const type = this.status === 200 ? "success" : "error";
					let response = xhr.responseText,
						callbacks = [];
	
					// parse JSON
					if (["json", null].includes(settings.dataType)) {
						try {
							response = JSON.parse(response);
						} catch (e) {
							// do nothing
						}
					}
	
					// run callbacks
					[settings.statusCode[xhr.status], settings[type], settings.complete].forEach(function (callback) {
						if (callback) {
							callback.call(settings.context, response, xhr.status, xhr);
						}
					});
				}
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
	
	$.getScript = (url, success) => {
		return $.ajax({
			url: url,
			dataType: "script",
			success: success
		});
	};
	
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
						$(response).filter(selector).each(function () {
							html += this.innerHTML;
						});
					} else {
						html = response;
					}
	
					// set HTML to nodes in collection
					while (i--) {
						this[i].innerHTML = response;
					}
	
					// fire success callback on nodes
					if (success) {
						success(response, status, xhr);
					}
				}
			})
		}
		return this;
	};
	
	$.param = obj => {
		let params = [],
			add = (key, value, params) => {
				if ($.isArray(value) || typeof value === "object") {
					$.each(value, (i, val) => {
						params = add(key + "[" + i + "]", val, params);
					});
				} else {
					params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
				}
				return params;
			};
	
		// process values
		$.each(obj, function (i) {
			params = add(i, this, params);
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
			obj = this.is(selector) ? this.filter(selector) : $(selector, this);
	
		let params = {};
	
		// process values
		obj.each(function () {
			const value = $(this).val();
			if (!this.disabled && value !== undefined) {
				params[this.getAttribute("name")] = value;
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
					if (events.includes(key)) {
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
				n;
	
			// split class
			if (typeof cls === "string") {
				cls = cls.split(" ").reverse(); // reverse as we add them backwards
			}
	
			// manage classes on nodes
			while (i--) {
				n = cls.length;
				while (n--) {
					this[i].classList[func](getVal(cls[n], this[i], n));
				}
			}
			return this;
		};
	});
	
	$.fn.css = function (props, value) {
	
		// set the values
		if (value !== undefined) {
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
				props[i] = dasherise(props[i]);
				output[props[i]] = style.getPropertyValue(props[i]);
				if (ret) {
					return output[props[i]];
				}
			}
			return output;
		}
	};
	
	$.fn.data = function (name, data) {
		let temp = {},
			i = this.length;
	
		// convert data to object
		if (typeof name === "object") {
			data = name;
		} else if (data !== undefined) {
			temp[name] = data;
			data = temp;
		}
		name = camelise(name);
	
		// set value
		if (data !== undefined) {
			while (i--) {
				$.each(data, (key, value) => {
					this[i].dataset[camelise(key)] = typeof value === "object" ? JSON.stringify(value) : value;
				});
			}
			return this;
	
		// get value
		} else if (this[0] && this[0].dataset[name]) {
			try {
				return JSON.parse(this[0].dataset[name]);
			} catch (e) {
				return this[0].dataset[name];
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
	
		function getValue(value) {
			if (value && !isNaN(value)) {
				value = value % 1 === 0 ? parseInt(value) : parseFloat(value);
			}
			return value;
		}
	
		// set value
		if (value !== undefined) {
			let i = this.length,
				val;
			while (i--) {
				if (this[i].multiple) {
					val = $.map(
						$.isArray(value) ? value : [value],
						item => getValue(item)
					);
					$("option", this[i]).each(function () {
						this.selected = val.includes(getValue(this.value));
					});
				} else {
					this[i].value = getValue(value);
				}
			}
			return this;
	
		// read value from first node
		} else if (this[0]) {
	
			// get multiple values
			if (this[0].multiple) {
				let values = [];
				$("option", this[0]).each(function () {
					if (this.selected) {
						values.push(getValue(this.value));
					}
				});
				return values;
	
			// get radio box value
			} else if (this[0].type === "radio") {
				let obj = this.filter("[name='" + this[0].name + "']:checked").get(0);
				return getValue(obj ? obj.value : undefined);
	
			// get single value
			} else if (this[0].type !== "checkbox" || this[0].checked) {
				return getValue(this[0].value);
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
	
		function getAdditionalLength(obj, wh, props) {
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
		}
	
		$.fn[dim] = function (val) {
			const valtype = typeof(val),
				wh = dim.toLowerCase().includes("width") ? "width" : "height", // width or height
				io = dim.includes("inner") ? "inner" : (dim.includes("outer") ? "outer" : ""); // inner outer or neither
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
	
	getEvents().forEach(function (event) {
		$.fn[event] = function (callback) {
			return callback ? this.on(event, callback) : this.trigger(event);
		};
	});
	
	// add and remove event handlers
	["on", "one", "off"].forEach(name => {
		$.fn[name] = function (events, selector, data, callback) {
			let i = this.length,
				e,
				fn,
				node;
	
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
				node = this[i];
				e = events.length;
				if (!node.events) {
					node.events = [];
				}
	
				// record the original function
				if (name !== "off") {
					fn = function (evt) { // delegate function
						if (!selector || $(selector).is(evt.target)) {
							if (data) { // set data to event object
								evt.data = data;
							}
							if (callback.apply(selector ? evt.target : this, evt.args ? $.extend([evt], evt.args) : [evt]) === false) {
								evt.preventDefault();
								evt.stopPropagation();
							}
						}
					};
					node.events.push({
						events: events,
						callback: callback,
						func: fn
					});
	
					// trigger
					while (e--) {
						node.addEventListener(events[e], fn, name === "one" ? {once: true} : false);
					}
	
				// find the original function
				} else if (node.events) {
					while (e--) {
						node.events.forEach((evt, i) => {
							const index = evt.events.indexOf(events[e]);
							if (index !== -1 && evt.callback === callback) {
								node.removeEventListener(events[e], evt.func);
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
		let evt = new CustomEvent(name),
			i = this.length;
	
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
			const pre = ["before", "prepend"].includes(name),
				isFunc = $.isFunction(html);
			let i = this.length,
				elems = $(),
				backwards, // for counting down
				forwards = -1, // for counting up
				obj;
	
			if (!isFunc) {
				$.each(arguments, function (i, arg) {
					elems.add(arg);
				});
			}
	
			while (i--) {
				if (isFunc) {
					elems = $(getVal(html, this[i], i));
				}
				backwards = elems.length;
				while (pre ? backwards-- : ++forwards < backwards) { // insert forwards or backwards?
					obj = elems.get(pre ? backwards : forwards);
	
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
	
			// turn selector into dabby object
			if (selector) {
				selector = $(selector);
			}
	
			// detach selected nodes
			while (i--) {
				if (!selector || selector.is(this[i])) {
					nodes.push(this[i].parentNode.removeChild(this[i]));
				} else {
					obj.push(this[i]);
				}
			}
	
			// create a new dabby object to return
			return $(func === "detach" ? nodes : obj);
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
		return this.parent(selector).not("body").each(function () {
			const item = this,
				parent = item.parentNode;
	
			$(item.childNodes).each((i, node) => {
				parent.insertBefore(node, item);
			});
			return $(parent.removeChild(item));
		});
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
				node = $(getVal(html, this[0])).get(0).cloneNode(true);
	
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
	
	$.fn.add = function (nodes) {
		nodes = $(nodes);
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
		return $([].filter.call(this, function (node) {
			return $(selector, node).length !== 0;
		}));
	};
	
	$.fn.index = function (selector) {
		let index = -1,
			i = this.length,
			elem = this[0],
			node;
	
		if (selector) {
			node = $(selector).get(0);
			while (i--) {
				if (this[i].isSameNode(node)) {
					return i;
				}
			}
		} else if (elem && elem.parentNode) {
			index = 0;
			while (elem = elem.previousSibling) {
				index++;
			}
		}
		return index;
	};
	
	$.fn.is = function (selector) {
		return filterNodes(this, selector).length !== 0;
	};
	
	$.fn.last = function () {
		return this.eq(-1);
	};
	
	["next", "nextAll", "nextUntil", "prev", "prevAll", "prevUntil"].forEach(func => {
		$.fn[func] = function (selector, filter) {
			const next = func.includes("next"),
				all = func.includes("All"),
				until = func.includes("Until"),
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
			const all = func.includes("s"),
				until = func.includes("U");
			let nodes = [],
				i = this.length,
				parent;
	
			while (i--) {
				parent = this[i].parentNode;
				while (parent) {
					nodes.push(parent);
					if (!all || (until && filterNodes(parent, selector))) {
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
			this[i].parentNode.childNodes.forEach(child => {
				if (!child.isSameNode(this[i])) {
					nodes.push(child);
				}
			});
		}
		return $(selector ? filterNodes(nodes, selector) : nodes);
	};
	
	$.extend = function (obj, ...arrs) {
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
	
	$.isArray = function (arr) {
		return Array.isArray(arr);
	};
	
	$.isFunction = function (func) {
		return func && func.constructor === Function;
	};
	
	$.isWindow = function (obj) {
		return obj !== null && obj === obj.window;
	};
	
	$.map = function (obj, callback) {
		const keys = Object.keys(obj),
			len = keys.length;
		let arr = [],
			i = 0,
			result;
	
		for (; i < len; i++) {
			result = callback.call(window, obj[keys[i]], keys[i])
			if (![null, undefined].includes(result)) {
				arr.push(result);
			}
		}
		return arr;
	};
	return dabby;}));