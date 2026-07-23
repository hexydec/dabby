import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";

/**
 * Reduce the collection to its first element.
 *
 * If the collection is empty, returns an empty Dabby collection.
 *
 * @returns a new Dabby collection containing only the first element
 *
 * @example
 * $("li").first().addClass("first");
 */
function first(this: Dabby): Dabby {
	return $(this[0]);
}

Object.defineProperty(Dabby.prototype, "first", { value: first, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    first(): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __first = typeof first;

