import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import type {} from "../../modular.js";
import filterNodes from "../../internal/filternodes/filternodes.js";
import type {} from "../../modular.js";

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

function is(this: Dabby, selector: FilterSelector): boolean {
	return factory(this, selector) as boolean;
}

Object.defineProperty(Dabby.prototype, "is", { value: is, configurable: true });

function filter(this: Dabby, selector: FilterSelector): Dabby {
	return factory(this, selector, true) as Dabby;
}

Object.defineProperty(Dabby.prototype, "filter", { value: filter, configurable: true });

function not(this: Dabby, selector: Selector): Dabby {
	return factory(this, selector, true, true) as Dabby;
}

Object.defineProperty(Dabby.prototype, "not", { value: not, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
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

