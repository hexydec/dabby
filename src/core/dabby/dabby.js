import isFunction from "../../internal/isfunction/isfunction.js";
import isWindow from "../../internal/iswindow/iswindow.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import parseHTML from "../../internal/parsehtml/parsehtml.js";

/**
 * The inputs for a dabby selector - A string containing a CSS selector, a Node object or array of Node objects, or iterable yielding Node objects, or a Document object, or a Dabby object
 * @typedef {(string|Node|Node[]|Document|Dabby)} selector
 */

/**
 * Dabby class, manipulates DOM nodes
 * 
 * @class
 * @type {Object.<number, Node>}
 * @property {number} length The number of DOM nodes in the collection.
 */
class Dabby {

	#length = 0;

	/**
	 * Dabby factory, generates a dabby object containing DOM elements for manipulation
	 * 
	 * @param {selector} [selector] - The selector or object(s) to store in the `dabby` object
	 * @param {selector} [context] - An object or selector to find `selector` within
	 */
	constructor(selector, context) {
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
					if (context && isPlainObject(context) && Dabby.prototype.hasOwnProperty("attr")) {
						$(nodes).attr(context);
					}

				// parse HTML into nodes
				} else {
					nodes = parseHTML(selector, context || document, true);
				}

			// $ collection - copy nodes to new object
			} else if (selector instanceof Dabby) {
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
		this.#length = i;

		// assign nodes to object
		while (i--) {
			Object.defineProperty(this, i, {
				value: nodes[i],
				enumerable: true
			});
		}
	}

	/**@type {number} */
	get length() {
		return this.#length;
	}
}

// wire up the factory method
// const $ = Dabby.prototype.init;

/**
 * Dabby factory, generates a dabby object containing DOM elements for manipulation
 * 
 * @param {selector} [selector] - The selector or object(s) to store in the `dabby` object
 * @param {selector} [context] - An object or selector to find `selector` within
 * @returns {Dabby} A Dabby object containing the nodes requested with `selector`
 */
const $ = (selector, context) => {
	return new Dabby(selector, context);
};

// set the factory prototype to the class prototype and prevent overwriting
Object.defineProperty($, "prototype", {
	value: Dabby.prototype
});
Object.defineProperty($, "fn", {
	value: Dabby.prototype
});

// export
export default $;