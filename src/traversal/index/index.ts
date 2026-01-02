import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { DOMNode, Selector } from "../../types.js";
import type {} from "../../modular.js";

function index(this: Dabby, selector?: Selector): number {
	if (this[0]) {
		let nodes: ArrayLike<DOMNode>;
		let subject: DOMNode = this[0];
		let i: number;

		// if no selector, match against first elements siblings
		if (selector === undefined) {
			nodes = (this[0] as Element).parentNode!.children;

		// if selector is string, match first node in current collection against resulting collection
		} else if (typeof selector === "string") {
			nodes = $(selector);

		// if element or collection match the element or first node against current collection
		} else {
			nodes = this;
			subject = $(selector)[0];
		}

		i = nodes.length;
		while (i--) {
			if (nodes[i] === subject) {
				return i;
			}
		}
	}
	return -1;
}

Object.defineProperty(Dabby.prototype, "index", { value: index, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    index: typeof index;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __index = typeof index;

