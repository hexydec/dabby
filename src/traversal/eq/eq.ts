import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";

function eq(this: Dabby, i: number): Dabby {
	if (i < 0) {
		i += this.length;
	}
	return this[i] ? $(this[i]) : $();
}

Object.defineProperty(Dabby.prototype, "eq", { value: eq, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    eq(index: number): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __eq = typeof eq;

