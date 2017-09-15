var doc = document,
	ready = [],
	domready = false,
	$;

function dabby(selector, context) {
	return new dabby.fn.init(selector, context);
};

$ = dabby;

// basic functionality
$.fn = $.prototype = {
	root: doc,
	constructor: dabby,
	init: function (selector, context) {
		var nodes = [],
			i,
			match;

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
					utils.setCss($(nodes), context); // UNTESTED
				}

			// create document fragment
			} else {
				nodes = (context || doc).createRange().createContextualFragment(selector).childNodes;
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
