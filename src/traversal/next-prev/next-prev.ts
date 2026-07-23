import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { Selector } from "../../types.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

type ElementSiblingMethod = "nextElementSibling" | "previousElementSibling";

function factory(
	obj: Dabby,
	selector?: Selector,
	filter?: Selector | null,
	notall?: boolean,
	until?: boolean,
	next?: boolean
): Dabby {
	const nodes: Element[] = [];
	let i = 0;
	const len = obj.length;
	const method: ElementSiblingMethod = (next ? "next" : "previous") + "ElementSibling" as ElementSiblingMethod;

	// look through each node and get siblings
	for (; i < len; i++) {
		let sibling: Element | null = (obj[i] as Element)[method];
		while (sibling) {

			// end when we match until
			if (until && filterNodes(sibling, selector!).length) {
				break;
			}

			// add the node
			nodes.push(sibling);

			// end when not finding all
			if (notall) {
				break;
			}
			sibling = sibling[method];
		}
	}

	// swap args for *Until methods
	if (until) {
		selector = filter!;
	}

	// return new collection
	return $(selector ? filterNodes($(nodes), selector) as Element[] : nodes);
}

/**
 * Get the immediately following sibling of every item in the collection.
 *
 * If a selector is supplied, the result is filtered to siblings that match.
 *
 * @param selector - optional CSS selector to narrow the result
 * @returns a new Dabby collection of next siblings
 *
 * @example
 * $("li.active").next();
 */
function next(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector, null, true, false, true);
}

Object.defineProperty(Dabby.prototype, "next", { value: next, configurable: true });

/**
 * Get every following sibling of every item in the collection.
 *
 * If a selector is supplied, the result is filtered to siblings that match.
 *
 * @param selector - optional CSS selector to narrow the result
 * @returns a new Dabby collection of all subsequent siblings
 *
 * @example
 * $("h2.section").nextAll("p");
 */
function nextall(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector, null, false, false, true);
}

Object.defineProperty(Dabby.prototype, "nextAll", { value: nextall, configurable: true });

/**
 * Get following siblings up to (but not including) the first one that matches `selector`.
 *
 * Optionally filter the collected siblings with a second selector.
 *
 * @param selector - the boundary selector; iteration stops at the first match
 * @param filter - optional selector that filters the collected siblings
 * @returns a new Dabby collection of siblings up to the boundary
 *
 * @example
 * $("h2.section").nextUntil("h2");
 */
function nextuntil(this: Dabby, selector: Selector, filter?: Selector): Dabby {
	return factory(this, selector, filter, false, true, true);
}

Object.defineProperty(Dabby.prototype, "nextUntil", { value: nextuntil, configurable: true });

/**
 * Get the immediately preceding sibling of every item in the collection.
 *
 * If a selector is supplied, the result is filtered to siblings that match.
 *
 * @param selector - optional CSS selector to narrow the result
 * @returns a new Dabby collection of previous siblings
 *
 * @example
 * $("li.active").prev();
 */
function prev(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector, null, true);
}

Object.defineProperty(Dabby.prototype, "prev", { value: prev, configurable: true });

/**
 * Get every preceding sibling of every item in the collection.
 *
 * If a selector is supplied, the result is filtered to siblings that match.
 *
 * @param selector - optional CSS selector to narrow the result
 * @returns a new Dabby collection of all preceding siblings
 *
 * @example
 * $(".footer").prevAll("section");
 */
function prevall(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector);
}

Object.defineProperty(Dabby.prototype, "prevAll", { value: prevall, configurable: true });

/**
 * Get preceding siblings up to (but not including) the first one that matches `selector`.
 *
 * Optionally filter the collected siblings with a second selector.
 *
 * @param selector - the boundary selector; iteration stops at the first match
 * @param filter - optional selector that filters the collected siblings
 * @returns a new Dabby collection of preceding siblings up to the boundary
 *
 * @example
 * $("li.active").prevUntil("li.heading");
 */
function prevuntil(this: Dabby, selector: Selector, filter?: Selector): Dabby {
	return factory(this, selector, filter, false, true);
}

Object.defineProperty(Dabby.prototype, "prevUntil", { value: prevuntil, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    next(selector?: Selector): this;
    nextAll(selector?: Selector): this;
    nextUntil(selector: Selector, filter?: Selector): this;
    prev(selector?: Selector): this;
    prevAll(selector?: Selector): this;
    prevUntil(selector: Selector, filter?: Selector): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __next = typeof next;
export type __nextAll = typeof nextall;
export type __nextUntil = typeof nextuntil;
export type __prev = typeof prev;
export type __prevAll = typeof prevall;
export type __prevUntil = typeof prevuntil;

