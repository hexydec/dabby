import proxy from "../../internal/proxy/proxy";
import isFunction from "../../internal/isfunction/isfunction";
import isWindow from "../../internal/iswindow/iswindow";
import isPlainObject from "../../internal/isplainobject/isplainobject";
import parseHTML from "../../internal/parsehtml/parsehtml";

import { Selector, Callable, Dabby, DabbyObject } from '../../types/types'

// proxy dabby to make sure once properties are set, they cannot be overwritten
const $: Dabby = proxy(function dabby(this: any, selector: Selector, context: any): DabbyObject {
	if (this instanceof dabby) {
		let nodes: Node[] = [],
			match: string[] | null;

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
					nodes = parseHTML(selector,context || document, true);
				}

			// $ collection - copy nodes to new object
			} else if (selector instanceof dabby) {
				nodes = Array.from((selector as ArrayLike<Node>));

			// single node or Window
			} else if (selector instanceof Node || isWindow(selector)) {
				nodes = [(selector as Node)];

			// ready function
			} else if (isFunction(selector)) {
				if (document.readyState !== "loading") {
					(selector as Callable).call(document, $);
				} else {
					document.addEventListener("DOMContentLoaded", () => (selector as Callable).call(document, $), {once: true});
				}

			// array|NodeList|HTMLCollection of nodes
			} else {

				// check node is unique, then filter only element, document, documentFragment and window
				nodes = Array.from((selector as ArrayLike<Node>)).filter(
					(node, i, self) => self.indexOf(node) === i && ([1, 9, 11].includes(node.nodeType) || isWindow(node))
				)
			}
		}

		// create a getter for the length so it can't be edited from outside
		let i = nodes.length;
		Object.defineProperty((this as DabbyObject), "length", {
			get(): number {
				return this.length;
			},
			value: i
		});

		// assign nodes to object
		while (i--) {
			(this as DabbyObject)[i] = nodes[i];
		}
		return (this as DabbyObject);
	} else {
		return new (dabby as any)(selector, context);
	}
});

// proxy the prototype to $.fn to prevent methods from being overwritten
($ as unknown as DabbyObject).fn = proxy($.prototype);

export default $;
