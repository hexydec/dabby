import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";

/**
 * Reduce the collection to the single element at the given index.
 *
 * A negative index counts back from the end of the collection, so `-1`
 * returns the last element, `-2` the second-to-last, and so on. If the
 * requested index is out of range, an empty Dabby collection is returned.
 *
 * @param i - The zero-based index, or a negative offset from the end
 * @returns A new Dabby collection containing the single matched element, or an empty collection
 *
 * @example
 * $("li").eq(-1);
 */
function eq(this: Dabby, i: number): Dabby {
	if (i < 0) {
		i += this.length;
	}
	return this[i] ? $(this[i]) : $();
}

Object.defineProperty(Dabby.prototype, "eq", { value: eq, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    eq(index: number): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __eq = typeof eq;

