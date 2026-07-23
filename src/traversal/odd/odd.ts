import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { DOMNode } from "../../types.js";

/**
 * Reduce the collection to elements at odd indices (1, 3, 5, …).
 *
 * Indices are zero-based, so the second, fourth, sixth (and so on) elements
 * are kept. Pair with {@link Dabby.even} for striping patterns.
 *
 * @returns a new Dabby collection containing only odd-indexed elements
 *
 * @example
 * $("tr").odd().addClass("striped");
 */
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
