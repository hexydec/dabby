// import proxy from "../../internal/proxy/proxy.js";
import isFunction from "../../internal/isfunction/isfunction.js";
import isWindow from "../../internal/iswindow/iswindow.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import parseHTML from "../../internal/parsehtml/parsehtml.js";

// proxy dabby to make sure once properties are set, they cannot be overwritten
class dabby {

	constructor (selector, context) {
		let nodes = [],
			match;

		// if no selector, return empty collection
		if (selector) {

			// handle string selector first
			if (typeof selector === "string") {

				// CSS selector
				if (selector[0] !== "<") {

					// normalise context
					let obj = context ? $(context) : [document],
						i = obj.length;
					while (i--) {
						nodes = [...obj[i].querySelectorAll(selector), ...nodes];
					}

				// create a single node and attach properties
				} else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {
					nodes = [document.createElement(match[1])];

					// context is CSS attributes, import /src/attributes/attr/attr.js to use
					if (context && isPlainObject(context)) {
						$(nodes).attr(context);
					}

				// parse HTML into nodes
				} else {
					nodes = parseHTML(selector, context || document, true);
				}

			// $ collection - copy nodes to new object
			} else if (selector instanceof dabby) {
				nodes = Array.from(selector);

			// single node or Window
			} else if (selector instanceof Node || isWindow(selector)) {
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
					(node, i, self) => self.indexOf(node) === i && ([1, 9, 11].includes(node.nodeType) || isWindow(node))
				)
			}
		}

		// create a getter for the length so it can't be edited from outside
		let i = nodes.length;
		Object.defineProperty(this, "length", {
			get length() {
				return this.length;
			},
			value: i
		});

		// assign nodes to object
		while (i--) {
			this[i] = nodes[i];
		}
	}
}

const $ = (selector, context) => {
	return new dabby(selector, context);
};
$.fn = dabby.prototype;

export default $;
