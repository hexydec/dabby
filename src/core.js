define(function () {
	"use strict";
	
	var doc = document,
		ready = [],
		domready = false,
		dabby = function (selector, context) {
			return new dabby.fn.init(selector, context);
		};
	
	dabby.isWindow = function (obj) {
		return obj !== null && obj === obj.window;
	};
	dabby.isEmptyObject = function (obj) {
		for (var name in obj) {
			return false;
		}
		return true;
	};
	dabby.extend = function (obj) {
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
	dabby.each = function (obj, callback) {
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
	dabby.inArray = function(elem, arr, i) {
		return arr === null ? -1 : [].indexOf.call( arr, elem, i );
	};
	dabby.isFunction = function (obj) {
		return typeof obj === "function";
	};
	
	dabby.fn = {
		constructor: dabby,
		root: document,
		init: function (selector, context) {
			var nodes = [], i;

			// if no selector, return empty colletion
			if (!selector) {
				return this;

			// dabby collection
			} else if (selector instanceof dabby) {
				return selector;

			// array of nodes
			} else if (selector instanceof Array) {
				nodes = [].filter.call(selector, function (item) {
					return item !== null;
				});

			// single node
			} else if (selector.nodeType && dabby.inArray(selector.nodeType, [1, 9])) {
				nodes = [selector];

			// CSS selector
			} else if (typeof selector === "string") {

				// if is HTML create nodes
				if (selector.indexOf("<") === 0) {

				} else {
					context = dabby(context).get(0) || this.root;
					nodes = context.querySelectorAll(selector);
				}

			// ready function
			} else if (dabby.isFunction(selector)) {
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
			dabby.each(this.get(), callback);
			return this;
		}
	};
	dabby.fn.init.prototype = dabby.fn;
	
	// bind ready functions
	doc.addEventListener("DOMContentLoaded", function () {
		var i = 0;
		for (i = 0; i < ready.length; i += 1) {
			ready[i]();
		}
	}, false);
	
	// wrap it up and return
	return dabby;
});