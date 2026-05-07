import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";

/**
 * Reduce the collection to a contiguous subset, like `Array.prototype.slice`.
 *
 * Negative indices count back from the end of the collection. The end index
 * is exclusive; if omitted, the slice runs to the end.
 *
 * @param start - the zero-based start index, or a negative offset from the end
 * @param end - optional exclusive end index, or a negative offset from the end
 * @returns a new Dabby collection containing the sliced elements
 *
 * @example
 * $("li").slice(0, 3);   // first three items
 * $("li").slice(-2);     // last two items
 */
function slice(this: Dabby, start: number, end?: number): Dabby {
	return $(Array.from(this).slice(start, end));
}

Object.defineProperty(Dabby.prototype, "slice", { value: slice, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    slice(start: number, end?: number): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __slice = typeof slice;

