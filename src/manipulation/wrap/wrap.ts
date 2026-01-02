import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import type {} from "../../modular.js";
import getVal from "../../internal/getval/getval.js";
import type {} from "../../modular.js";

type WrapCallback = (this: Element, index: number) => Selector;

function wrap(this: Dabby, html: Selector | WrapCallback): Dabby {
	let i = this.length;
	const dabbyCollection = this as unknown as { readonly length: number; readonly [n: number]: Element };
	const values = getVal(dabbyCollection, html);

	while (i--) {
		const element = $(this[i]);
		if (element.wrapAll) {
			element.wrapAll(values[i] as Selector);
		}
	}

	return this;
}

Object.defineProperty(Dabby.prototype, "wrap", { value: wrap, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    wrap: typeof wrap;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __wrap = typeof wrap;

