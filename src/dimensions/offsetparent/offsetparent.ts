import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";

function offsetParent(this: Dabby): Dabby {
	return this[0] ? $((this[0] as HTMLElement).offsetParent || undefined) : $();
}

Object.defineProperty(Dabby.prototype, "offsetParent", { value: offsetParent, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    offsetParent: typeof offsetParent;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __offsetParent = typeof offsetParent;

