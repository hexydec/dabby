define(["utils"], function (utils) {
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
			for (n in arrs[i]) {
				if (arrs[i].hasOwnProperty(n)) {
					obj[n] = arrs[i][n];
				}
			}
		}
		return obj;
	};
	
	$.each = function (obj, callback) {
		if (obj instanceof Array) {
			obj.forEach(callback, obj);
		} else {
			for (var i in obj) {
				if (obj.hasOwnProperty(i) && callback.call(obj[i], i, obj[i]) === false) {
					break;
				}
			}
		}
		return obj;
	};
	
	$.map = function (obj, callback) {
		if (obj instanceof Array) {
			return obj.map(callback);
		} else {
			var arr = [], i;
			for (i in obj) {
				if (obj.hasOwnProperty(i)) {
					arr.push(callback(obj[i], i));
				}
			}
			return arr;
		}
	};
	
	$.fn = {
		constructor: $,
		root: doc,
		init: function (selector, context) {
			var nodes = [], i, match, frag;

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
			} else if (selector.nodeType && [1, 9].indexOf(selector.nodeType) > -1) {
				nodes = [selector];

			// ready function
			} else if (typeof selector === "function") {
				if (domready) {
					selector();
				} else {
					ready.push(selector);
				}

			// CSS selector
			} else if (typeof selector === "string") {
				if (selector.indexOf("<") === -1) {
					context = $(context).get(0) || this.root;
					nodes = context.querySelectorAll(selector);

				// match single selector
				} else if ((match = selector.match(/^<([a-z0-9]+)( ?\/?|><\/\\1)>/i)) !== null) {
					nodes.push(doc.createElement(match[1]));
					if (context instanceof Array) {
						return utils.setCss($(nodes), context);
					}
				
				// create document fragment
				} else {
					frag = (context || doc).createDocumentFragment();
					frag.innerHTML = selector;
					for (i in frag.children) {
						if (frag.children.hasOwnProperty(i)) {
							nodes.push(frag.children[i]);
						}
					}
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
		},
		map: function (callback) {
			var $this = this,
				nodes = [],
				i = 0;
			for (; i < $this.length; i += 1) {
				nodes.push(callback.call($this[0], i, $this[0]));
			}
			return $(nodes);
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