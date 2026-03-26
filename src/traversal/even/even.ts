import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { DOMNode } from "../../types.js";

function even(this: Dabby): Dabby {
	const nodes: DOMNode[] = [];
	for (let i = 0; i < this.length; i += 2) {
		nodes.push(this[i]);
	}
	return $(nodes);
}

Object.defineProperty(Dabby.prototype, "even", { value: even, configurable: true });

declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    even(): this;
  }
}

export type __even = typeof even;
