import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import type {} from "../../modular.js";
import "../../core/get/get.js";

function has(this: Dabby, selector: Selector): Dabby {
	const compare = $(selector).get();
	return $(Array.from(this).filter((node) =>
		compare.some((item) => (node as Node).contains(item as Node))
	));
}

Object.defineProperty(Dabby.prototype, "has", { value: has, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    has: typeof has;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __has = typeof has;

