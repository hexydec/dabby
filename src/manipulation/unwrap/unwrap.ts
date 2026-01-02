import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import type {} from "../../modular.js";

function unwrap(this: Dabby, selector?: Selector): Dabby {
	this.parent?.(selector).not?.("body").each<Element>(function(this: Element, _key: number, obj: Element) {
		$(obj.children).each<Element>(function(this: Element, _i: number, node: Element) {
			obj.parentNode!.insertBefore(node, obj);
		});
		obj.parentNode!.removeChild(obj);
	});

	return this;
}

Object.defineProperty(Dabby.prototype, "unwrap", { value: unwrap, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    unwrap: typeof unwrap;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __unwrap = typeof unwrap;

