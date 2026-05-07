import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { Selector } from "../../types.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

type FilterCallback = (this: Element, index: number) => boolean;
type FilterSelector = Selector | FilterCallback;

function factory(
	obj: Dabby,
	selector: FilterSelector,
	filter?: boolean,
	not?: boolean
): Dabby | boolean {
	const nodes = filterNodes(obj, selector as Selector | ((this: Node, index: number, node: Node) => boolean), not); // "not"
	return filter ? $(nodes as Element[]) : !!nodes.length; // not "is" : "is"
}

/**
 * Determine whether any element in the collection matches the given selector.
 *
 * Useful for testing membership without producing a new collection.
 *
 * @param selector - A selector or callback used to test each element
 * @returns `true` if at least one element matches, otherwise `false`
 *
 * @example
 * if ($(".button").is(".active")) { ... }
 */
function is(this: Dabby, selector: FilterSelector): boolean {
	return factory(this, selector) as boolean;
}

Object.defineProperty(Dabby.prototype, "is", { value: is, configurable: true });

/**
 * Reduce the collection to elements that match the given selector or callback.
 *
 * When a callback is supplied it is invoked once per element with the element
 * index. Returning a truthy value keeps the element; a falsy value removes
 * it. Inside the callback, `this` refers to the current element.
 *
 * @param selector - A selector or callback used to filter each element
 * @returns A new Dabby collection containing only the matching elements
 *
 * @example
 * $(".item").filter(".active");
 */
function filter(this: Dabby, selector: FilterSelector): Dabby {
	return factory(this, selector, true) as Dabby;
}

Object.defineProperty(Dabby.prototype, "filter", { value: filter, configurable: true });

/**
 * Reduce the collection to elements that do not match the given selector.
 *
 * The inverse of [`filter`]. Elements that match `selector` are removed from
 * the result.
 *
 * @param selector - A selector or callback used to identify elements to exclude
 * @returns A new Dabby collection containing only the non-matching elements
 *
 * @example
 * $(".item").not(".disabled");
 */
function not(this: Dabby, selector: Selector): Dabby {
	return factory(this, selector, true, true) as Dabby;
}

Object.defineProperty(Dabby.prototype, "not", { value: not, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    filter(selector: Selector | ((this: Element, index: number) => boolean)): this;
    is(selector: Selector | ((this: Element, index: number) => boolean)): boolean;
    not(selector: Selector): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __filter = typeof filter;
export type __is = typeof is;
export type __not = typeof not;

