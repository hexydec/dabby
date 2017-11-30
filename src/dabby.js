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
			match,
			obj,
			self = this;

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

			// array|NodeList|HTMLCollection of nodes
			} else if (typeof selector !== "string") {
				nodes = selector;

			// CSS selector
			} else if (selector.indexOf("<") === -1) {
				context = context || doc;
				$(context).each(function () {
					nodes = nodes.concat([].slice.call(this.querySelectorAll(selector)));
				});

			// create a single node and attach properties
			} else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {
				nodes.push(doc.createElement(match[1]));

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
				obj = doc.createElement("template");
    			obj.innerHTML = selector;
    			nodes = obj.content ? obj.content.childNodes : obj.childNodes;
			}
		}

		// build nodes
		self.length = 0;
		nodes.forEach(function (node) {
			if ([1, 9, 11].indexOf(node.nodeType) !== -1) { // only element, document and documentFragment
				self[self.length++] = node;
			}
		});
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
