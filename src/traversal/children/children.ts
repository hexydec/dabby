import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import type {} from "../../modular.js";
import filterNodes from "../../internal/filternodes/filternodes.js";
import type {} from "../../modular.js";

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
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    children(selector?: Selector): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __children = typeof children;

