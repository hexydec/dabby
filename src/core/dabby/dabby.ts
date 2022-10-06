import proxy from '../../internal/proxy/proxy.js';
import isFunction from '../../internal/isfunction/isfunction.js';
import isWindow from '../../internal/iswindow/iswindow.js';
import isPlainObject from '../../internal/isplainobject/isplainobject.js';
import parseHTML from '../../internal/parsehtml/parsehtml.js';

import { Selector, DabbyNode, Dabby, DabbyConstructor } from './types.js';

// proxy dabby to make sure once properties are set, they cannot be overwritten
const dabby = function dabby(dabby: DabbyConstructor, selector: Selector, context?: Selector): Dabby {
	if (this instanceof dabby) {
		let nodes: Array<DabbyNode | Node> = [],
			match: RegExpMatchArray | null;

		// if no selector, return empty collection
		if (selector) {

			// handle string selector first
			if (typeof selector === 'string') {
				// CSS selector
				if (selector[0] !== '<') {
					// normalise context
					let obj = context ? new dabby(context) : [document],
						i = obj.length;
					while (i--) {
						nodes = [
							...nodes,
							...(obj[i] as Element | Document | DocumentFragment).querySelectorAll(selector),
						];
					}

					// create a single node and attach properties
				} else if (
					(match = selector.match(
						/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i
					)) !== null
				) {
					const single = document.createElement(match[1]);
					nodes = [single];

					// context is CSS attributes, import /src/attributes/attr/attr.js to use
					if (context && isPlainObject(context)) {
						new dabby(single).attr(context);
					}

					// parse HTML into nodes
				} else {
					nodes = parseHTML(selector, context || document, true);
				}

				// $ collection - copy nodes to new object
			} else if (selector instanceof dabby) {
				nodes = Array.from(selector);

				// single node
			} else if (selector instanceof Node) {
				if ([1, 9, 11].includes(selector.nodeType)) {
					nodes = [selector];
				}

				// window object
			} else if (isWindow(selector)) {
				nodes = [selector];

				// ready function
			} else if (isFunction(selector)) {
				if (document.readyState !== 'loading') {
					selector.call(document, dabby);
				} else {
					document.addEventListener(
						'DOMContentLoaded',
						() => selector.call(document, dabby),
						{ once: true }
					);
				}

				// array|NodeList|HTMLCollection of nodes
			} else {
				// check node is unique, then filter only element, document, documentFragment and window
				nodes = Array.from(selector).filter(
					(node, i, self) => self.indexOf(node) === i && (isWindow(node) || [1, 9, 11].includes(node.nodeType))
				);
			}
		}

		// assign nodes to object
		let i = nodes.length;
		while (i--) {
			this[i] = nodes[i];
		}

		// create a getter for the length so it can't be edited from outside
		Object.defineProperty(this, "length", {
			get() {
				return this.length;
			},
			value: i,
		});
		return this;
	} else {
		return new dabby(selector, context);
	}
};

// proxy the prototype to $.fn to prevent methods from being overwritten
dabby.fn = proxy(dabby.prototype);

// export default dabby;
export default proxy(dabby);
