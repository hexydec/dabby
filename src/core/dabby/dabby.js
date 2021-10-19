import proxy from "../../internal/proxy/proxy.js";
import isFunction from "../../internal/isfunction/isfunction.js";
import isWindow from "../../internal/iswindow/iswindow.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import parseHTML from "../../internal/parsehtml/parsehtml.js";

// proxy dabby to make sure once properties are set, they cannot be overwritten
const $ = proxy(function dabby(selector, context) {
	if (this instanceof dabby) {
		let nodes = [],
			match;

		// if no selector, return empty collection
		if (selector) {

			// handle string selector first
			if (typeof selector === "string") {

				// CSS selector
				if (selector[0] !== "<") {

					// normalise context
					const obj = $(context || document);
					let i = obj.length;
					while (i--) {
						nodes = [...obj[i].querySelectorAll(selector)].concat(nodes);
					}

				// create a single node and attach properties
				} else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {
					nodes = [document.createElement(match[1])];

					// context is CSS attributes, import /src/attributes/attr/attr.js to use
					if (isPlainObject(context)) {
						$(nodes).attr(context);
					}

				// parse HTML into nodes
				} else {
					nodes = parseHTML(selector, context || document, true);
				}

			// $ collection
			} else if (selector instanceof dabby) {
				return selector;

			// single node
			} else if (selector instanceof Node) {
				nodes = [selector];

			} else if (isWindow(selector)) {
				nodes = [selector];

			// ready function
			} else if (isFunction(selector)) {
				if (document.readyState !== "loading") {
					selector.call(document, $);
				} else {
					document.addEventListener("DOMContentLoaded", () => selector.call(document, $), {once: true});
				}

			// array|NodeList|HTMLCollection of nodes
			} else {

				// check node is unique, then filter only element, document, documentFragment and window
				nodes = Array.from(selector).filter(
					(node, i, self) => self.indexOf(node) === i && ([1, 9, 11].indexOf(node.nodeType) > -1 || isWindow(node))
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
});

// proxy the prototype to $.fn to prevent methods from being overwritten
$.fn = proxy($.prototype, ["length"], true);

export default $;
