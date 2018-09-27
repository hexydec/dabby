const $ = function dabby(selector, context) {
	let nodes = [],
		match,
		obj;

	// enables new object to be created through $()
	if (!(this instanceof dabby)) {
		return new dabby(selector, context);

	// if no selector, return empty colletion
	} else if (selector) {

		// $ collection
		if (selector instanceof dabby) {
			return selector;

		// single node
		} else if (selector.nodeType || isWindow(selector)) {
			nodes = [selector];

		// ready function
		} else if (isFunction(selector)) {
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
			nodes.push(document.createElement(match[1]));

			// context is CSS attributes
			if (context instanceof Object) {
				obj = $(nodes);
				utilEach(context, (prop, value) => {
					obj.attr(prop, value);
				});
			}

		// parse HTML into nodes
		} else {
			//nodes = (context || doc).createRange().createContextualFragment(selector).childNodes; // not supported in iOS 9
			obj = document.createElement("template");
			obj.innerHTML = selector;
			nodes = obj.content ? obj.content.children : obj.children;
		}
	}

	// build nodes
	this.length = 0;
	Array.from(nodes).forEach(node => { // HTMLCollection objects don't support forEach
		if ([1, 9, 11].indexOf(node.nodeType) > -1 || isWindow(node)) { // only element, document, documentFragment and window
			this[this.length++] = node;
		}
	});
	return this;
};

// alias functions
$.fn = $.prototype;

export default $;