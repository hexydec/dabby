"use strict";

var _typeof3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof3(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof3(obj);
};

var _slicedToArray = function () {
	function sliceIterator(arr, i) {
		var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
			for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
				_arr.push(_s.value);if (i && _arr.length === i) break;
			}
		} catch (err) {
			_d = true;_e = err;
		} finally {
			try {
				if (!_n && _i["return"]) _i["return"]();
			} finally {
				if (_d) throw _e;
			}
		}return _arr;
	}return function (arr, i) {
		if (Array.isArray(arr)) {
			return arr;
		} else if (Symbol.iterator in Object(arr)) {
			return sliceIterator(arr, i);
		} else {
			throw new TypeError("Invalid attempt to destructure non-iterable instance");
		}
	};
}();

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

/*! dabbyjs v0.9.3 by Will Earp - https://github.com/hexydec/dabby */

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(function () {
			return factory(global);
		});
	} else if (typeof exports !== "undefined") {
		module.exports = factory(global);
	} else if (!global.$) {
		global.$ = factory(global);
	}
})(undefined || window, function (window) {
	"use strict";

	if (!Array.from) {
		Array.from = function (arrayLike, mapFn, thisArg) {
			var arr = [].slice.call(arrayLike);
			if (typeof mapFn === "function") {
				arr = arr.map(mapFn, thisArg);
			}
			return arr;
		};
	}

	// CustomEvent is not supported in IE11
	if (typeof window.CustomEvent !== "function") {
		var _CustomEvent = function _CustomEvent(event, params) {
			params = params || { bubbles: false, cancelable: false, detail: undefined };
			var evt = document.createEvent("CustomEvent");
			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
			return evt;
		};

		_CustomEvent.prototype = window.Event.prototype;
		window.CustomEvent = _CustomEvent;
	}

	// support Element.matches() in IE and older Webkit
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector;
	}

	if (!NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, thisArg) {
			thisArg = thisArg || window;
			for (var i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}

	function camelise(prop) {
		return prop.replace(/-([a-z])/gi, function (text, letter) {
			return letter.toUpperCase();
		});
	}

	function dasherise(prop) {
		return prop.replace(/[A-Z]/g, function (letter) {
			return "-" + letter.toLowerCase();
		});
	}

	function filterNodes(dabby, filter, context, not) {
		var func = void 0,
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
			if (typeof filter === "string") {
				filter = [filter];
			} else {
				filter = Array.from($(filter, context));
			}

			// filter function
			func = function func(n, node) {
				var i = filter.length;
				while (i--) {
					if (node[typeof filter[i] === "string" ? "matches" : "isSameNode"](filter[i])) {
						return true;
					}
				}
				return false;
			};
		}
		return nodes.filter(function (item, i) {
			return func.call(item, i, item) !== Boolean(not);
		}, nodes);
	}

	function getEvents() {
		return ["focusin", "focusout", "focus", "blur", "resize", "scroll", "unload", "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave", "contextmenu", "change", "select", "keydown", "keypress", "keyup", "error", "submit"];
	}

	function getProp(prop) {
		var properties = {
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
		var name = props,
		    keys = void 0,
		    k = void 0,
		    remove = void 0;

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
			var i = dabby.length;
			while (i--) {
				var val = props[keys[k]] === "" ? undefined : getVal(props[keys[k]], dabby[i], k, dabby[i].style[keys[k]]);
				if (typeof val === "number") {
					val += "px";
				}
				dabby[i].style[remove ? "removeProperty" : "setProperty"](dasherise(keys[k]), val);
			}
		}
		return dabby;
	}

	var dabby = function dabby(selector, context) {
		var _this = this;

		var nodes = [],
		    match = void 0,
		    obj = void 0;

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
					document.addEventListener("DOMContentLoaded", function () {
						selector.call(document, $);
					}, { once: true });
				}

				// array|NodeList|HTMLCollection of nodes
			} else if (typeof selector !== "string") {
				nodes = selector;

				// CSS selector
			} else if (selector.indexOf("<") === -1) {
				context = context || document;
				$(context).each(function (i, obj) {
					nodes = nodes.concat(Array.from(obj.querySelectorAll(selector)));
				});

				// create a single node and attach properties
			} else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {
				nodes.push(document.createElement(match[1]));

				// context is CSS attributes
				if (context instanceof Object) {
					obj = $(nodes);
					$.each(context, function (prop, value) {
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
		Array.from(nodes).forEach(function (node) {
			// HTMLCollection objects don't support forEach
			if ([1, 9, 11].indexOf(node.nodeType) > -1 || $.isWindow(node)) {
				// only element, document, documentFragment and window
				_this[_this.length++] = node;
			}
		});
		return this;
	},
	    $ = dabby; // alias in this scope

	// alias functions
	dabby.fn = dabby.prototype;

	$.each = function (obj, callback) {
		var keys = Object.keys(obj),
		    len = keys.length;

		for (var i = 0; i < len; i++) {
			if (callback.call(obj[keys[i]], keys[i], obj[keys[i]]) === false) {
				break; // stop if callback returns false
			}
		}
		return obj;
	};

	$.ajax = function (url, settings) {

		// normalise args
		if ((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object") {
			settings = url;
		} else {
			if ((typeof settings === "undefined" ? "undefined" : _typeof(settings)) !== "object") {
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

		var sync = ["script", "jsonp"].indexOf(settings.dataType) > -1,
		    script = void 0,
		    xhr = void 0;

		// add cache buster
		if (settings.cache || settings.cache === null && sync) {
			settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + "_=" + +new Date();
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
			}, function (key, value) {
				script.addEventListener(key, function () {
					var response = settings.dataType === "jsonp" ? window[settings.jsonpCallback] || null : null;
					[settings[value], settings.complete].forEach(function (callback) {
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
			var callback = function callback(xhr, status) {
				var response = xhr.responseText,
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
				[settings.statusCode[xhr.status], settings[status], settings.complete].forEach(function (callback) {
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
			$.each(settings.headers, function (key, value) {
				xhr.setRequestHeader(key, value);
			});

			// callbacks
			xhr.onload = function () {
				var types = {
					200: "success",
					204: "nocontent",
					304: "notmodified"
				};
				callback(xhr, types[xhr.status] || "error");
			};
			xhr.ontimeout = function () {
				callback(xhr, "timeout");
			};
			xhr.onabort = function () {
				callback(xhr, "abort");
			};
			xhr.send(settings.processData ? undefined : settings.data);
			return xhr;
		}
	};

	$.get = function (url, data, success, type) {
		var isFunc = data && $.isFunction(data);
		return $.ajax((typeof url === "undefined" ? "undefined" : _typeof(url)) === "object" ? url : {
			url: url,
			data: isFunc ? {} : data,
			success: isFunc ? data : success,
			dataType: isFunc ? success : type
		});
	};

	$.getScript = function (url, success) {
		return $.ajax({
			url: url,
			dataType: "script",
			success: success
		});
	};

	$.fn.load = function (url, data, _success) {
		var _this2 = this;

		if (this[0]) {

			// get selector from URL
			var _url$split = url.split(" ", 2),
			    _url$split2 = _slicedToArray(_url$split, 2),
			    uri = _url$split2[0],
			    selector = _url$split2[1];

			// check for data


			if ($.isFunction(data)) {
				_success = data;
				data = undefined;
			}

			// make AJAX request
			$.ajax(uri, {
				data: data,
				type: data instanceof Object ? "POST" : "GET",
				success: function success(response, status, xhr) {

					// if a selector is specified, find it in the returned document
					var html = "",
					    i = _this2.length;

					// refine by selector if supplied
					if (selector) {
						$(response).filter(selector).each(function (key, obj) {
							html += obj.outerHTML;
						});
					} else {
						html = response;
					}

					// set HTML to nodes in collection
					while (i--) {
						_this2[i].innerHTML = html;

						// fire success callback on nodes
						if (_success) {
							_success.call(_this2[i], response, status, xhr);
						}
					}
				}
			});
		}
		return this;
	};

	$.param = function (obj) {
		var params = [],
		    add = function add(key, value, params) {
			var isArr = $.isArray(value);
			if (isArr || (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {
				$.each(value, function (i, val) {
					params = add(key + "[" + (isArr ? "" : i) + "]", val, params);
				});
			} else {
				params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
			}
			return params;
		};

		// process values
		$.each(obj, function (key, item) {
			params = add(key, item, params);
		});
		return params.join("&");
	};

	$.get = function (url, data, success, type) {
		var isFunc = $.isFunction(data);
		var settings = (typeof url === "undefined" ? "undefined" : _typeof(url)) === "object" ? url : {
			url: url,
			data: isFunc ? {} : data,
			success: isFunc ? data : success,
			dataType: isFunc ? success : type
		};
		settings.type = "POST";
		return $.ajax(settings);
	};

	$.fn.serialize = function () {
		var selector = "input[name]:not([type=file]):not([type=submit]),textarea[name],select[name]",
		    obj = this.is(selector) ? this.filter(selector) : $(selector, this),
		    add = function add(name, value, params) {
			var match = void 0;

			if ((match = name.match(/([^\[]*)\[([^\]]*)\](.*)/)) !== null) {
				name = match[1];
				var arr = add(match[2] + match[3], value, params[name] || {});
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

		var params = {};

		// process values
		obj.each(function (key, obj) {
			var value = $(obj).val();
			if (!obj.disabled && value !== undefined) {
				params = add(obj.getAttribute("name"), value, params);
			}
		});
		return $.param(params);
	};

	$.fn.attr = function (prop, value) {
		var _this3 = this;

		var isArr = $.isArray(prop),
		    i = void 0,
		    events = void 0,
		    arr = {};

		// set properties
		if (isArr || value || value === null) {
			i = this.length, events = getEvents();

			// normalise to array
			if (!isArr) {
				arr[prop] = value;
				prop = arr;
			}

			while (i--) {
				$.each(prop, function (key, val) {
					if (events.indexOf(key) > -1) {
						$(_this3[i]).on(key, val);
					} else if (key === "style") {
						_this3[i].style.cssText = val;
					} else if (key === "class") {
						_this3[i].className = val;
					} else if (key === "text") {
						_this3[i].textContent = val;
					} else if (value === null) {
						_this3[i].removeAttribute(key);
					} else {
						_this3[i].setAttribute(key, val);
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

	["addClass", "removeClass", "toggleClass"].forEach(function (name) {
		$.fn[name] = function (cls) {

			// remove "Class" from name for classList method
			var func = name.substr(0, name.length - 5),
			    i = this.length;

			// manage classes on nodes
			while (i--) {
				var arr = getVal(cls, this[i], i, this[i].className);
				if (typeof arr === "string") {
					arr = arr.split(" ").reverse(); // reverse as we add them backwards
				} else {
					arr = arr.reverse();
				}
				var n = arr.length;
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
			var name = props,
			    i = void 0,
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
		var _this4 = this;

		// convert data to object
		if ((typeof name === "undefined" ? "undefined" : _typeof(name)) === "object") {
			data = name;
		} else if (data !== undefined) {
			var temp = {};
			temp[name] = data;
			data = temp;
		}

		// set value
		if (data !== undefined) {
			var _ret = function () {
				var i = _this4.length;
				while (i--) {
					$.each(data, function (key, value) {
						_this4[i].dataset[camelise(key)] = (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" ? JSON.stringify(value) : value;
					});
				}
				return {
					v: _this4
				};

				// get value
			}();

			if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
		} else if (this[0] && this[0].dataset) {
			var parse = function parse(value) {
				try {
					return JSON.parse(value);
				} catch (e) {
					return value;
				}
			};

			// all properties
			if (name === undefined) {
				var arr = {};
				$.each(this[0].dataset, function (key, value) {
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
		var i = this.length;
		while (i--) {
			if (this[i].classList.contains(cls)) {
				return true;
			}
		}
		return false;
	};

	$.fn.prop = function (prop, value) {
		prop = getProp(prop);

		// set
		if (value !== undefined) {
			var i = this.length;
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
		var i = this.length;
		prop = getProp(prop);

		while (i--) {
			delete this[i][prop];
		}
		return this;
	};

	$.fn.val = function (value) {
		var _this5 = this;

		// set value
		if (value !== undefined) {
			var _ret2 = function () {
				var i = _this5.length,
				    val = void 0;
				while (i--) {
					if (_this5[i].multiple) {
						val = $.map($.isArray(value) ? value : [value], function (item) {
							return String(item);
						});
						$("option", _this5[i]).each(function (key, obj) {
							obj.selected = val.indexOf(String(obj.value)) > -1;
						});
					} else {
						_this5[i].value = String(value);
					}
				}
				return {
					v: _this5
				};

				// read value from first node
			}();

			if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
		} else if (this[0]) {

			// get multiple values
			if (this[0].multiple) {
				var values = [];
				$("option", this[0]).each(function (key, obj) {
					if (obj.selected) {
						values.push(String(obj.value));
					}
				});
				return values;

				// get radio box value
			} else if (this[0].type === "radio") {
				var obj = this.filter("[name='" + this[0].name + "']:checked")[0];
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
		var len = this.length;
		var values = [],
		    i = 0;

		for (; i < len; i++) {
			values.push(callback.call(this[i], i, this[i]));
		}
		return values;
	};

	$.fn.offset = function (coords) {
		var doc = document.documentElement;
		var rect = void 0,
		    i = this.length,
		    pos = void 0,
		    parent = void 0;

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
					this[i].style.top = parseFloat(coords.top) - (pos === "fixed" ? 0 : doc.scrollTop + rect.top) + "px";
					this[i].style.left = parseFloat(coords.left) - (pos === "fixed" ? 0 : doc.scrollLeft + rect.left) + "px";
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

	["scrollLeft", "scrollTop"].forEach(function (item) {
		$.fn[item] = function (pos) {

			// set
			if (pos !== undefined) {
				var i = this.length;
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

	["width", "height", "innerWidth", "innerHeight", "outerWidth", "outerHeight"].forEach(function (dim) {

		var getAdditionalLength = function getAdditionalLength(obj, wh, props) {
			var style = getComputedStyle(obj);
			var i = props.length,
			    value = 0,
			    suffix = void 0;

			while (i--) {
				suffix = props[i] === "border" ? "-width" : "";
				value += parseFloat(style.getPropertyValue(props[i] + (wh === "width" ? "-left" : "-top") + suffix)) || 0;
				value += parseFloat(style.getPropertyValue(props[i] + (wh === "width" ? "-right" : "-bottom") + suffix)) || 0;
			}
			return value;
		};

		$.fn[dim] = function (val) {
			var valtype = typeof val === "undefined" ? "undefined" : _typeof(val),
			    wh = dim.toLowerCase().indexOf("width") > -1 ? "width" : "height",


			// width or height
			io = dim.indexOf("inner") > -1 ? "inner" : dim.indexOf("outer") > -1 ? "outer" : ""; // inner outer or neither
			var i = this.length,
			    value = void 0,
			    whu = void 0,
			    props = void 0,
			    param = void 0;

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
					if (io === "" || io === "outer" && val === true) {
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
		$.fn[event] = function (data, callback) {
			return data ? this.on(event, data, callback) : this.trigger(event);
		};
	});

	// add and remove event handlers
	["on", "one", "off"].forEach(function (name) {
		$.fn[name] = function (events, selector, data, callback) {
			var _this6 = this;

			var i = this.length,
			    fn = function fn(evt) {
				// delegate function
				if (!selector || $(selector).is(evt.target)) {
					if (data) {
						// set data to event object
						evt.data = data;
					}
					if (callback.call(selector ? evt.target : this, evt, evt.args) === false) {
						evt.preventDefault();
						evt.stopPropagation();
					}
				}
			};

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

			var _loop = function _loop() {
				var node = _this6[i],
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
						func: fn
					});

					// trigger
					while (e--) {
						node.addEventListener(events[e], fn, { once: name === "one" });
					}

					// find the original function
				} else if (node.events.length) {
					while (e--) {
						node.events.forEach(function (evt, i) {
							var index = evt.events.indexOf(events[e]);
							if (index !== -1 && evt.callback === callback && evt.selector === selector) {
								node.removeEventListener(events[e], evt.func, {}); // must pass same arguments
								node.events[i].events.splice(index, 1);
								if (!node.events[i].events.length) {
									node.events.splice(i, 1);
								}
							}
						});
					}
				}
			};

			while (i--) {
				_loop();
			}
			return this;
		};
	});

	$.fn.trigger = function (name, data) {
		var evt = new CustomEvent(name, { bubbles: true, cancelable: true });
		var i = this.length;

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
		var nodes = [],
		    i = this.length;

		while (i--) {
			nodes[i] = this[i].cloneNode(true);
		}
		return $(nodes);
	};

	$.fn.empty = function () {
		var i = this.length;
		while (i--) {
			this[i].innerHTML = "";
		}
		return this;
	};

	$.fn.html = function (html) {

		// set
		if (html !== undefined) {
			var i = this.length;
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
	}, function (name, pos) {
		$.fn[name] = function (html) {
			var pre = ["before", "prepend"].indexOf(name) > -1,
			    isFunc = $.isFunction(html);
			var i = this.length,
			    elems = $();

			if (!isFunc) {
				// multiple arguments containing nodes?
				$.each(arguments, function (i, arg) {
					elems.add(arg);
				});
			}

			while (i--) {
				if (isFunc) {
					elems = $(getVal(html, this[i], i, this[i].innerHTML));
				}
				var backwards = elems.length,


				// for counting down
				forwards = -1; // for counting up
				while (pre ? backwards-- : ++forwards < backwards) {
					// insert forwards or backwards?
					var obj = elems[pre ? backwards : forwards];

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
	}, function (name, func) {
		$.fn[name] = function (selector) {
			var i = this.length,
			    obj = $(selector);

			while (i--) {
				obj[func](this[i]);
			}
			return this;
		};
	});

	["remove", "detach"].forEach(function (func) {
		$.fn[func] = function (selector) {
			var i = this.length,
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
		var get = text === undefined;
		var len = this.length,
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
		this.parent(selector).not("body").each(function (key, obj) {
			var parent = obj.parentNode;

			$(obj.children).each(function (i, node) {
				parent.insertBefore(node, obj);
			});
			parent.removeChild(obj);
		});
		return this;
	};

	$.fn.wrap = function (html) {
		var i = this.length;

		while (i--) {
			$(this[i]).wrapAll(getVal(html, this[i], i));
		}
		return this;
	};

	$.fn.wrapAll = function (html) {
		if (this[0]) {

			// set variables
			var len = this.length,
			    i = 0,
			    _node = $(getVal(html, this[0]))[0].cloneNode(true);

			// insert clone into parent
			this[0].parentNode.insertBefore(_node, null);

			// find innermost child of node
			while (_node.firstElementChild) {
				_node = _node.firstElementChild;
			}

			// attach nodes to the new node
			for (; i < len; i++) {
				_node.appendChild(this[i]);
			}
		}
		return this;
	};

	$.fn.add = function (nodes, context) {
		nodes = $(nodes, context);
		var len = this.length,
		    i = nodes.length;

		this.length += i;
		while (i--) {
			this[i + len] = nodes[i];
		}
		return this;
	};

	$.fn.children = function (selector) {
		var nodes = [],
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
		var i = this.length,
		    nodes = [],
		    parents = void 0,
		    node = void 0;

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
		var key = i < 0 ? i + this.length : i;
		return $(this[key] || null);
	};

	["filter", "not"].forEach(function (name) {
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
		return $(this.get().filter(function (node) {
			return !!$(selector, node).length;
		}));
	};

	$.fn.index = function (selector) {
		var index = -1;

		if (this[0]) {
			var nodes = void 0,
			    subject = this[0],
			    type = typeof selector === "undefined" ? "undefined" : _typeof(selector),
			    i = void 0;

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

	["next", "nextAll", "nextUntil", "prev", "prevAll", "prevUntil"].forEach(function (func) {
		$.fn[func] = function (selector, filter) {
			var next = func.indexOf("next") > -1,
			    all = func.indexOf("All") > -1,
			    until = func.indexOf("Until") > -1,
			    method = next ? "nextElementSibling" : "previousElementSibling";
			var nodes = [],
			    i = this.length,
			    sibling = void 0;

			// look through each node and get siblings
			while (i--) {
				sibling = this[i][method];
				while (sibling) {
					nodes.push(sibling);
					if (all || until && filterNodes(sibling, selector).length) {
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

	["parent", "parents", "parentsUntil"].forEach(function (func) {
		$.fn[func] = function (selector, filter) {
			var all = func.indexOf("s") > -1,
			    until = func.indexOf("U") > -1;
			var nodes = [],
			    i = this.length,
			    parent = void 0;

			while (i--) {
				parent = this[i].parentNode;
				while (parent && parent.nodeType === Node.ELEMENT_NODE) {
					nodes.push(parent);
					if (!all || until && filterNodes(parent, selector).length) {
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

	$.fn.siblings = function (selector) {
		var _this7 = this;

		var i = this.length,
		    nodes = [];

		while (i--) {
			Array.from(this[i].parentNode.children).forEach(function (child) {
				if (!child.isSameNode(_this7[i])) {
					nodes.push(child);
				}
			});
		}
		return $(selector ? filterNodes(nodes, selector) : nodes);
	};

	$.extend = function (obj) {
		for (var _len = arguments.length, arrs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			arrs[_key - 1] = arguments[_key];
		}

		var len = arrs.length;
		var i = 0,
		    keys = void 0,
		    k = void 0;

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

	$.isPlainObject = function (obj) {

		// Basic check for Type object that's not null
		if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj !== null) {

			// If Object.getPrototypeOf supported, use it
			if (typeof Object.getPrototypeOf == 'function') {
				var proto = Object.getPrototypeOf(obj);
				return proto === Object.prototype || proto === null;
			}

			// Otherwise, use internal class
			// This should be reliable as if getPrototypeOf not supported, is pre-ES5
			return Object.prototype.toString.call(obj) === "[object Object]";
		}

		// Not an object
		return false;
	};

	$.isWindow = function (obj) {
		return obj !== null && obj === obj.window;
	};

	$.map = function (obj, callback) {
		var keys = Object.keys(obj),
		    len = keys.length;
		var arr = [],
		    i = 0,
		    result = void 0;

		for (; i < len; i++) {
			result = callback.call(window, obj[keys[i]], keys[i]);
			if (![null, undefined].indexOf(result) > -1) {
				arr.push(result);
			}
		}
		return arr;
	};
	return dabby;
});
//# sourceMappingURL=dabby.es5.js.map
//# sourceMappingURL=dabby.es5.js.map
//# sourceMappingURL=dabby.es5.js.map
//# sourceMappingURL=dabby.es5.js.map
