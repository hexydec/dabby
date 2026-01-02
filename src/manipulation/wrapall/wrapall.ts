import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import type {} from "../../modular.js";

type WrapCallback = (this: Element) => Selector;

function wrapAll(this: Dabby, html: Selector | WrapCallback): Dabby {
	if (this[0]) {
		let wrapper: Selector;

		if (typeof html === "function") {
			wrapper = html.call(this[0] as Element);
		} else {
			wrapper = html;
		}

		// Set variables
		const len = this.length;
		let i = 0;
		const wrapperDabby = $(wrapper);
		let node: Element = (wrapperDabby.eq?.(0).clone?.(true).get?.(0) as Element) ?? (wrapperDabby[0] as Element);

		// Insert clone into parent
		(this[0] as Element).parentNode!.insertBefore(node, null);

		// Find innermost child of node
		while (node.firstElementChild) {
			node = node.firstElementChild;
		}

		// Attach nodes to the new node
		for (; i < len; i++) {
			node.appendChild(this[i] as Node);
		}
	}

	return this;
}

Object.defineProperty(Dabby.prototype, "wrapAll", { value: wrapAll, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    wrapAll: typeof wrapAll;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __wrapAll = typeof wrapAll;

