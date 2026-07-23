import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { Selector } from "../../types.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

/**
 * Get the siblings of every item in the collection.
 *
 * The element itself is excluded from the result. If a selector is supplied,
 * only siblings that match are kept.
 *
 * @param selector - optional CSS selector to narrow the result
 * @returns a new Dabby collection of sibling elements
 *
 * @example
 * $("li.active").siblings();
 */
function siblings(this: Dabby, selector?: Selector): Dabby {
	let i = this.length;
	const nodes: Element[] = [];

	while (i--) {
		[...(this[i] as Element).parentNode!.children].forEach((child) => {
			if (child !== this[i]) {
				nodes.push(child);
			}
		});
	}
	return $(selector ? filterNodes($(nodes), selector) as Element[] : nodes);
}

Object.defineProperty(Dabby.prototype, "siblings", { value: siblings, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    siblings(selector?: Selector): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __siblings = typeof siblings;

