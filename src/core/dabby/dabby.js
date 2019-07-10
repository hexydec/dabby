const $ = function dabby(selector, context) {

	// if no selector, return empty colletion
	if (this instanceof dabby) {

		// build nodes into a set (Which only allows unique items), then filter only element, document, documentFragment and window
		const nodes = [...new Set(Array.from(selector))].filter(node => [1, 9, 11].indexOf(node.nodeType) > -1 || $.isWindow(node));
		Object.assign(this, nodes); // only unique nodes
		this.length = nodes.length;
		return this;
	}

	// $ collection
	if (selector instanceof dabby) {
		return selector;
	}

	let nodes = [],
		match;

	// gather nodes
	if (selector) {

		// single node
		if (selector.nodeType || $.isWindow(selector)) {
			nodes = [selector];

		// ready function
		} else if ($.isFunction(selector)) {
			if (document.readyState !== "loading") {
				selector.call(document, $);
			} else {
				document.addEventListener("DOMContentLoaded", () => {selector.call(document, $);}, {once: true});
			}

		// array|NodeList|HTMLCollection of nodes
		} else if (typeof selector !== "string") {
			nodes = selector;

		// CSS selector
		} else if (selector.indexOf("<") === -1) {
			$(context || document).each((i, obj) => {
				nodes = nodes.concat(Array.from(obj.querySelectorAll(selector)));
			});

		// create a single node and attach properties
		} else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {
			nodes = [document.createElement(match[1])];

			// context is CSS attributes
			if (context instanceof Object) {
				$(nodes).attr(context);
			}

		// parse HTML into nodes
		} else {
			const obj = document.implementation.createHTMLDocument("");
			obj.body.innerHTML = selector;
			nodes = obj.body.children;
		}
	}
	return new dabby(nodes);
};

// alias functions
$.fn = $.prototype;

export default $;
