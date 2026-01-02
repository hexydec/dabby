import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";

function first(this: Dabby): Dabby {
	return $(this[0]);
}

Object.defineProperty(Dabby.prototype, "first", { value: first, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    first(): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __first = typeof first;

