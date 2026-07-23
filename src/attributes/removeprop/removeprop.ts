import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import getProp from "../../internal/getprop/getprop.js";

/**
 * Removes the requested property from every node in the collection.
 *
 * Only use this for custom properties you have set yourself — removing native DOM
 * properties (such as `className` or `innerHTML`) may throw or otherwise misbehave.
 *
 * @param prop - the property name to remove
 * @returns the original Dabby collection for chaining
 *
 * @example
 * $(".product-card").removeProp("tempProcessingData");
 */
function removeProp(this: Dabby, prop: string): Dabby {
	const normalisedProp = getProp(prop);
	let i = this.length;

	while (i--) {
		delete (this[i] as unknown as Record<string, unknown>)[normalisedProp];
	}

	return this;
}

Object.defineProperty(Dabby.prototype, "removeProp", { value: removeProp, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    removeProp(prop: string): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __removeProp = typeof removeProp;

