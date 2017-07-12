define(["utils"], function (utils) {
	"use strict";
	
	var doc = document,
		ready = [],
		domready = false;
	
	function dabby(selector, context) {
		return new dabby.fn.init(selector, context);
	};
	
	$ = dabby;
	
	$.extend = function (obj) {
		var arrs = arguments,
			i = 1,
			keys,
			k;
		const len = arguments.length;
		for (; i < len; i += 1) {
			keys = Object.keys(arrs[i]);
			k = keys.length;
			while (k--) {
				obj[keys[k]] = arrs[i][keys[k]];
			}
		}
		return obj;
	};
	
	$.each = function (obj, callback) {
		var keys = Object.keys(obj),
			i = 0;
		const len = keys.length;
		for (; i < len; i += 1) {
			if (callback.call(obj[keys[i]], keys[i], obj[keys[i]]) === false) {
				break;
			}
		}
		return obj;
	};
	
	$.map = function (obj, callback) {
		if (obj instanceof Array) {
			return obj.map(callback);
		} else {
			const arr = [],
				keys = Object.keys(obj),
				len = keys.length;
			for (var i = 0; i < len; i += 1) {
				arr.push(callback(obj[keys[i]], keys[i]));
			}
			return arr;
		}
	};
	
	// basic functionality
	$.fn = $.prototype = {
		root: doc,
		constructor: dabby,
		init: function (selector, context) {
			var nodes = [],
				i,
				match,
				frag,
				keys;

			// if no selector, return empty colletion
			if (!selector) {
				return this;

			// $ collection
			} else if (selector instanceof dabby) {
				return selector;

			// array of nodes
			} else if (Array.isArray(selector)) {
				nodes = [].filter.call(selector, function (item) {
					return item !== null;
				});

			// single node
			} else if (selector.nodeType) {
				nodes = [selector];

			// ready function
			} else if (selector.constructor === Function) {
				if (domready) {
					selector();
				} else {
					ready.push(selector);
				}

			// CSS selector
			} else if (typeof selector === "string") {
				if (selector[0] !== "<") {
					context = $(context).get(0) || this.root;
					nodes = context.querySelectorAll(selector);

				// match single selector
				} else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {
					nodes.push(doc.createElement(match[1]));
					if (context instanceof Array) {
						return utils.setCss($(nodes), context);
					}
				
				// create document fragment
				} else {
					frag = (context || doc).createRange().createContextualFragment(selector);
					frag.innerHTML = selector;
					keys = Object.keys(frag.children);
					i = keys.length;
					while (i--) {
						nodes[i] = frag.children[keys[i]];
					}
				}
			}

			// build nodes
			this.selector = selector || "";
			this.context = context;
			this.length = i = nodes.length;
			while (i--) {
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
			const nodes = [],
				len = this.length;
			for (var i = 0; i < len; i += 1) {
				nodes.push(callback.call(this[0], i, this[0]));
			}
			return $(nodes);
		}
	};
	
	// alias functions
	$.fn.init.prototype = $.fn;
	
	// bind ready functions
	doc.addEventListener("DOMContentLoaded", function () {
		for (var i = 0; i < ready.length; i += 1) {
			ready[i]();
		}
	}, false);
	
	// wrap it up and return
	return $;
});