define(function () {
	"use strict";
	
	var doc = document,
		ready = [],
		domready = false,
		$ = function (selector, context) {
			return new $.fn.init(selector, context);
		};
	
	$.isWindow = function (obj) {
		return obj !== null && obj === obj.window;
	};
	
	$.isEmptyObject = function (obj) {
		for (var name in obj) {
			return false;
		}
		return true;
	};
	
	$.extend = function (obj) {
		var arrs = arguments,
			len = arguments.length,
			i = 1,
			n;
		for (; i < len; i += 1) {
			for (var n in arrs[i]) {
				if (arrs[i].hasOwnProperty(n)) {
					obj[n] = arrs[i][n];
				}
			}
		}
		return obj;
	};
	
	$.each = function (obj, callback) {
		var length, i = 0;

		if (obj instanceof Array) {
			obj.forEach(callback);
		} else {
			for (i in obj) {
				if (obj.hasOwnProperty(i) && callback.call(obj[i], i, obj[i]) === false) {
					break;
				}
			}
		}
		return obj;
	};
	
	$.inArray = function(elem, arr, i) {
		return arr === null ? -1 : [].indexOf.call(arr, elem, i);
	};
	
	$.isFunction = function (obj) {
		return typeof obj === "function";
	};
	
	$.fn = {
		constructor: $,
		root: document,
		init: function (selector, context) {
			var nodes = [], i;

			// if no selector, return empty colletion
			if (!selector) {
				return this;

			// $ collection
			} else if (selector instanceof $) {
				return selector;

			// array of nodes
			} else if (selector instanceof Array) {
				nodes = [].filter.call(selector, function (item) {
					return item !== null;
				});

			// single node
			} else if (selector.nodeType && $.inArray(selector.nodeType, [1, 9])) {
				nodes = [selector];

			// CSS selector
			} else if (typeof selector === "string") {

				// if is HTML create nodes
				if (selector.indexOf("<") === 0) {

				} else {
					context = $(context).get(0) || this.root;
					nodes = context.querySelectorAll(selector);
				}

			// ready function
			} else if ($.isFunction(selector)) {
				if (domready) {
					selector();
				} else {
					ready.push(selector);
				}
			}

			// build nodes
			this.selector = selector || "";
			this.context = context;
			this.length = nodes.length;
			for (i = 0; i < this.length; i++) {
				this[i] = nodes[i];
			}
			return this;
		},
		get: function (i) {
			return i === undefined ? [].slice.call(this) : this[i >= 0 ? i : i + this.length];
		},
		each: function (callback) {
			$.each(this.get(), callback);
			return this;
		}
	};
	$.fn.init.prototype = $.fn;
	
	// bind ready functions
	doc.addEventListener("DOMContentLoaded", function () {
		var i = 0;
		for (i = 0; i < ready.length; i += 1) {
			ready[i]();
		}
	}, false);
	
	// wrap it up and return
	return $;
});