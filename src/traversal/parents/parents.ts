import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { Selector } from "../../types.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

function factory(
	obj: Dabby,
	selector?: Selector,
	filter?: Selector | null,
	single?: boolean,
	until?: boolean
): Dabby {
	const nodes: Element[] = [];
	let i = obj.length;

	while (i--) {
		let parent: Node | null = (obj[i] as Element).parentNode;
		while (parent && parent.nodeType === 1) { // Node.ELEMENT_NODE
			if (until && filterNodes(parent as Element, selector!).length) {
				break;
			}
			nodes.push(parent as Element);
			if (single) {
				break;
			}
			parent = parent.parentNode;
		}
	}
	if (!until) {
		filter = selector;
	}
	return $(filter ? filterNodes($(nodes), filter) as Element[] : nodes);
}

/**
 * Get the immediate parent of every item in the collection.
 *
 * If a selector is supplied, only parents that match are kept.
 *
 * @param selector - optional CSS selector to narrow the result
 * @returns a new Dabby collection of parent elements
 *
 * @example
 * $("li.active").parent();
 */
function parent(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector, null, true);
}

Object.defineProperty(Dabby.prototype, "parent", { value: parent, configurable: true });

/**
 * Get every ancestor of every item in the collection.
 *
 * Walks up to (but not including) the document. If a selector is supplied,
 * only ancestors that match are kept.
 *
 * @param selector - optional CSS selector to narrow the result
 * @returns a new Dabby collection of ancestor elements
 *
 * @example
 * $("a.external").parents("article");
 */
function parents(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector);
}

Object.defineProperty(Dabby.prototype, "parents", { value: parents, configurable: true });

/**
 * Get ancestors up to (but not including) the first one that matches `selector`.
 *
 * Optionally filter the collected ancestors with a second selector.
 *
 * @param selector - the boundary selector; iteration stops at the first match
 * @param filter - optional selector that filters the collected ancestors
 * @returns a new Dabby collection of ancestors up to the boundary
 *
 * @example
 * $("a.external").parentsUntil("article");
 */
function until(this: Dabby, selector: Selector, filter?: Selector): Dabby {
	return factory(this, selector, filter, false, true);
}

Object.defineProperty(Dabby.prototype, "parentsUntil", { value: until, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    parent(selector?: Selector): this;
    parents(selector?: Selector): this;
    parentsUntil(selector: Selector, filter?: Selector): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __parent = typeof parent;
export type __parents = typeof parents;
export type __parentsUntil = typeof until;

