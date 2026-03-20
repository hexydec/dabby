import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

function closest(this: Dabby, selector: Selector, context?: Selector): Dabby {
	let i = this.length;
	const nodes: Element[] = [];

	while (i--) {
		let node: Node | null = this[i] as Element;
		while (node && node.nodeType === 1) { // Node.ELEMENT_NODE
			if (filterNodes(node as Element, selector, context).length) {
				nodes.unshift(node as Element);
				break;
			}
			node = node.parentNode;
		}
	}
	return $(nodes);
}

Object.defineProperty(Dabby.prototype, "closest", { value: closest, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    closest(selector: Selector, context?: Selector): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __closest = typeof closest;

