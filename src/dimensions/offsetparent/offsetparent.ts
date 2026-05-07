import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";

/**
 * Retrieve the closest positioned ancestor of the first node in the collection.
 *
 * Wraps the native `HTMLElement.offsetParent` reference in a new Dabby collection.
 *
 * @returns A new Dabby collection containing the offset parent, or an empty collection if none exists.
 */
function offsetParent(this: Dabby): Dabby {
	return this[0] ? $((this[0] as HTMLElement).offsetParent || undefined) : $();
}

Object.defineProperty(Dabby.prototype, "offsetParent", { value: offsetParent, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    offsetParent(): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __offsetParent = typeof offsetParent;

