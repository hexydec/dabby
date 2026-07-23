import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { Selector } from "../../types.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

/**
 * Find the closest matching ancestor for each element in the collection.
 *
 * The search starts with the element itself and walks upwards through the
 * parent chain, stopping at the first ancestor that matches `selector`. An
 * optional `context` may be used to scope where the matching is performed.
 *
 * @param selector - A selector used to identify the target ancestor
 * @param context - An optional selector or node indicating where to scope the search
 * @returns A new Dabby collection containing the matched ancestors
 *
 * @example
 * $(".delete-button").closest(".list-item");
 */
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
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    closest(selector: Selector, context?: Selector): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __closest = typeof closest;

