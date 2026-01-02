import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import type {} from "../../modular.js";
import filterNodes from "../../internal/filternodes/filternodes.js";
import type {} from "../../modular.js";

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

function next(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector, null, true, false, true);
}

Object.defineProperty(Dabby.prototype, "next", { value: next, configurable: true });

function nextall(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector, null, false, false, true);
}

Object.defineProperty(Dabby.prototype, "nextAll", { value: nextall, configurable: true });

function nextuntil(this: Dabby, selector: Selector, filter?: Selector): Dabby {
	return factory(this, selector, filter, false, true, true);
}

Object.defineProperty(Dabby.prototype, "nextUntil", { value: nextuntil, configurable: true });

function prev(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector, null, true);
}

Object.defineProperty(Dabby.prototype, "prev", { value: prev, configurable: true });

function prevall(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector);
}

Object.defineProperty(Dabby.prototype, "prevAll", { value: prevall, configurable: true });

function prevuntil(this: Dabby, selector: Selector, filter?: Selector): Dabby {
	return factory(this, selector, filter, false, true);
}

Object.defineProperty(Dabby.prototype, "prevUntil", { value: prevuntil, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    next: typeof next;
    nextAll: typeof nextall;
    nextUntil: typeof nextuntil;
    prev: typeof prev;
    prevAll: typeof prevall;
    prevUntil: typeof prevuntil;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __next = typeof next;
export type __nextAll = typeof nextall;
export type __nextUntil = typeof nextuntil;
export type __prev = typeof prev;
export type __prevAll = typeof prevall;
export type __prevUntil = typeof prevuntil;

