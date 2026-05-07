import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { Selector } from "../../types.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

/**
 * Retrieve the direct children of every element in the collection.
 *
 * Only immediate children are returned — descendants nested deeper are
 * ignored. An optional selector narrows the result to children that match.
 *
 * @param selector - An optional selector used to filter the matched children
 * @returns A new Dabby collection containing the matched direct children
 *
 * @example
 * $("ul").children("li.active");
 */
function children(this: Dabby, selector?: Selector): Dabby {
	let nodes: Element[] = [];
	let i = this.length;

	while (i--) {
		nodes = [...nodes, ...(this[i] as Element).children];
	}

	// filter nodes by selector
	return $(selector ? filterNodes($(nodes), selector) as Element[] : nodes);
}

Object.defineProperty(Dabby.prototype, "children", { value: children, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    children(selector?: Selector): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __children = typeof children;

