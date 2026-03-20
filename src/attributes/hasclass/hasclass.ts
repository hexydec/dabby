import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";

function hasClass(this: Dabby, cls: string): boolean {
	let i = this.length;
	while (i--) {
		const element = this[i] as Element;
		if (element.classList && element.classList.contains(cls)) {
			return true;
		}
	}
	return false;
}

Object.defineProperty(Dabby.prototype, "hasClass", { value: hasClass, configurable: true });

// Module augmentation for auto-inferred modular imports
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    hasClass(cls: string): boolean;
  }
}

export type __hasClass = typeof hasClass;

