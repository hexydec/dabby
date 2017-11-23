function dabby(selector, context) {
	return new dabby.fn.init(selector, context);
}

var doc = document,
	ready = [],
	domready = false,
	$ = dabby;

// basic functionality
$.fn = $.prototype = {
	constructor: dabby,
	init: function (selector, context) {
		var nodes = [],
			i,
			match,
			obj,
			getContext = function (context) {
				return context ? $(context).get(0) || doc : doc;
			};

		// if no selector, return empty colletion
		if (selector) {

			// $ collection
			if (selector instanceof dabby) {
				return selector;

			// single node
			} else if (selector.nodeType) {
				nodes = [selector];

			// ready function
			} else if ($.isFunction(selector)) {
				if (domready) {
					selector.call(doc);
				} else {
					ready.push(selector);
				}

			// array of nodes
			} else if (typeof selector !== "string") {
				nodes = [].filter.call(selector, function (item) { // may be NodeList Collection
					return item !== null;
				});

			// CSS selector
			} else if (selector[0] !== "<") {
				nodes = getContext(context).querySelectorAll(selector);

			// match single selector
			} else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {

				// context is CSS attributes
				if (context instanceof Object) {
					nodes.push(doc.createElement(match[1]));
					obj = $(nodes);
					$.each(context, function (prop, value) {
						obj.attr(prop, value);
					});

				// context is node
				} else {
					nodes.push(getContext(context).createElement(match[1]));
				}

			// create document fragment
			} else {
				//nodes = (context || doc).createRange().createContextualFragment(selector).childNodes; // not supported in iOS 9
				obj = getContext(context).createElement("template");
    			obj.innerHTML = selector;
    			nodes = obj.content ? obj.content.childNodes : obj.childNodes;
			}
		}

		// build nodes
		//this.selector = selector || "";
		//this.context = context;
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
	for (var i = 0; i < ready.length; i++) {
		ready[i].call(doc);
	}
}, false);
