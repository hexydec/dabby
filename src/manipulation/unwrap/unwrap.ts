import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { Selector } from "../../types.js";

/**
 * Remove the parent of every item in the collection, leaving the items in place.
 *
 * If a selector is supplied, only parents that match it are removed; otherwise
 * the immediate parent is removed regardless. The `<body>` element is never
 * removed, even if it would otherwise match.
 *
 * @param selector - optional CSS selector that narrows which parents are removed
 * @returns the original Dabby collection for chaining
 *
 * @example
 * $("p").unwrap();
 */
function unwrap(this: Dabby, selector?: Selector): Dabby {
	(this as Dabby & { parent: (selector?: Selector) => Dabby & { not: (selector: string) => Dabby & { each: <T>(callback: (this: T, key: number, obj: T) => void) => Dabby } } }).parent(selector).not("body").each<Element>(function(this: Element, _key: number, obj: Element) {
		$(obj.children).each<Element>(function(this: Element, _i: number, node: Element) {
			obj.parentNode!.insertBefore(node, obj);
		});
		obj.parentNode!.removeChild(obj);
	});

	return this;
}

Object.defineProperty(Dabby.prototype, "unwrap", { value: unwrap, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    unwrap(selector?: Selector): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __unwrap = typeof unwrap;

