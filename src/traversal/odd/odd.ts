import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { DOMNode } from "../../types.js";

function odd(this: Dabby): Dabby {
	const nodes: DOMNode[] = [];
	for (let i = 1; i < this.length; i += 2) {
		nodes.push(this[i]);
	}
	return $(nodes);
}

Object.defineProperty(Dabby.prototype, "odd", { value: odd, configurable: true });

declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    odd(): this;
  }
}

export type __odd = typeof odd;
