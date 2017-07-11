define(["utils"], function (utils) {
	"use strict";
	
	var doc = document,
		ready = [],
		domready = false;
	
	function dabby(selector, context) {
		return new dabby.fn.init(selector, context);
	};
	
	$ = dabby;
	
	/*$.isWindow = function (obj) {
		return obj !== null && obj === obj.window;
	};
	
	$.isEmptyObject = function (obj) {
		for (var name in obj) {
			return false;
		}
		return true;
	};*/
	
	$.extend = function (obj) {
		var arrs = arguments,
			len = arguments.length,
			i = 1,
			keys,
			k = 0;
		for (; i < len; i += 1) {
			keys = Object.keys(arrs[i]);
			for (; k < keys.length; k += 1) {
				obj[keys[k]] = arrs[i][keys[k]];
			}
		}
		return obj;
	};
	
	$.each = function (obj, callback) {
		if (obj instanceof Array) {
			obj.forEach(callback, obj);
		} else {
			var keys = Object.keys(obj),
				i = 0;
			for (; i < keys.length; i += 1) {
				if (callback.call(obj[keys[i]], keys[i], obj[keys[i]]) === false) {
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
			var arr = [],
				keys = Object.keys(obj)
				i = 0;
			for (; i < keys.length; i += 1) {
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
				i = 0,
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
			} else if (selector instanceof Array) {
				nodes = [].filter.call(selector, function (item) {
					return item !== null;
				});

			// single node
			} else if (selector.nodeType) {
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
					for (; i < keys.length; i += 1) {
						nodes.push(frag.children[keys[i]]);
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
	
	// alias functions
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