import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";

function slice(this: Dabby, start: number, end?: number): Dabby {
	return $(Array.from(this).slice(start, end));
}

Object.defineProperty(Dabby.prototype, "slice", { value: slice, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    slice: typeof slice;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __slice = typeof slice;

