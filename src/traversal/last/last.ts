import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import "../eq/eq.js";

function last(this: Dabby): Dabby {
	return this.eq!(-1);
}

Object.defineProperty(Dabby.prototype, "last", { value: last, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    last(): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __last = typeof last;

