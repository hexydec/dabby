import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";

function find(this: Dabby, selector: Selector): Dabby {
	return $(selector, this);
}

Object.defineProperty(Dabby.prototype, "find", { value: find, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../modular.js' {
  interface ModularDabbyMethods {
    find(selector: Selector): this;
  }
}

// Export type witness to force TypeScript to include this file's augmentation
export type __find = typeof find;
