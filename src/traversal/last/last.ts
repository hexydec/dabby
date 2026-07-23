import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import "../eq/eq.js";

/**
 * Reduce the collection to its last element.
 *
 * If the collection is empty, returns an empty Dabby collection.
 *
 * @returns a new Dabby collection containing only the last element
 *
 * @example
 * $("li").last().addClass("last");
 */
function last(this: Dabby): Dabby {
	return (this as Dabby & { eq: (index: number) => Dabby }).eq(-1);
}

Object.defineProperty(Dabby.prototype, "last", { value: last, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    last(): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __last = typeof last;

