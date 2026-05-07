import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { Selector } from "../../types.js";
import getVal from "../../internal/getval/getval.js";

type WrapCallback = (this: Element, index: number) => Selector;

/**
 * Wrap each item in the collection with a copy of the supplied content.
 *
 * Each element receives its own clone of the wrapper. Pass a callback to
 * compute a different wrapper per element from its index. If the wrapper
 * has nested children, each element is placed inside the deepest descendant.
 *
 * @param html - a selector, HTML string, node or Dabby collection describing the wrapper, or a callback returning one
 * @returns the original Dabby collection for chaining
 *
 * @example
 * $("img.thumbnail").wrap("<a class='zoom'></a>");
 */
function wrap(this: Dabby, html: Selector | WrapCallback): Dabby {
	let i = this.length;
	const dabbyCollection = this as unknown as { readonly length: number; readonly [n: number]: Element };
	const values = getVal(dabbyCollection, html);

	while (i--) {
		const element = $(this[i]) as Dabby & { wrapAll?: (html: Selector) => Dabby };
		if (element.wrapAll) {
			element.wrapAll(values[i] as Selector);
		}
	}

	return this;
}

Object.defineProperty(Dabby.prototype, "wrap", { value: wrap, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    wrap(html: Selector | WrapCallback): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __wrap = typeof wrap;

