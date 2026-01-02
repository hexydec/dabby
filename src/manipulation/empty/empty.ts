import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";

function empty(this: Dabby): Dabby {
	let i = this.length;
	while (i--) {
		const element = this[i] as Element;
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}
	return this;
}

Object.defineProperty(Dabby.prototype, "empty", { value: empty, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    empty(): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __empty = typeof empty;

