const $ = function dabby(selector, context) {
	if (this) {
		let nodes = [],
			match;

		// if no selector, return empty collection
		if (selector) {

			// handle string selector first
			if (typeof selector === "string") {

				// CSS selector
				if (selector[0] !== "<") {

					// find nodes
					if (!context) {
						context = [document];
					} else if (typeof context === "string") {
						context = [document.querySelector(context)];
					} else if (context.nodeType) {
						context = [context];
					}

					// if the context exists, filter
					if (context.length) {
						nodes = context[0].querySelectorAll(selector);
					}

				// create a single node and attach properties
				} else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {
					nodes = [document.createElement(match[1])];

					// context is CSS attributes
					if ($.isPlainObject(context)) {
						$(nodes).attr(context);
					}

				// parse HTML into nodes
				} else {
					nodes = $.parseHTML(selector, context || document, true);
				}

			// $ collection
			} else if (selector instanceof dabby) {
				return selector;

			// single node
			} else if (selector.nodeType) {
				if ([1, 9, 11].indexOf(selector.nodeType) > -1) {
					nodes = [selector];
				}

			} else if ($.isWindow(selector)) {
				nodes = [selector];

			// ready function
			} else if ($.isFunction(selector)) {
				if (document.readyState !== "loading") {
					selector.call(document, $);
				} else {
					document.addEventListener("DOMContentLoaded", () => selector.call(document, $), {once: true});
				}

			// array|NodeList|HTMLCollection of nodes
			} else {

				// check node is unique, then filter only element, document, documentFragment and window
				nodes = Array.from(selector).filter(
					(node, i, self) => self.indexOf(node) === i && ([1, 9, 11].indexOf(node.nodeType) > -1 || $.isWindow(node))
				)
			}
		}

		// assign nodes to object
		let i = nodes.length;
		this.length = i;
		while (i--) {
			this[i] = nodes[i];
		}
		return this;
	} else {
		return new dabby(selector, context);
	}
};

// alias functions
$.fn = $.prototype;

export default $;
