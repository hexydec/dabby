import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { Selector } from "../../types.js";
import "../../core/get/get.js";

/**
 * Filter the collection to elements that contain at least one node matching the selector.
 *
 * Each element in the collection is kept if any of the nodes resolved from
 * `selector` is a descendant of it. Useful for selecting parents that hold a
 * particular kind of child.
 *
 * @param selector - a CSS selector string, node, node array or Dabby collection identifying nodes to look for
 * @returns a new Dabby collection containing only elements that contain a matching descendant
 *
 * @example
 * $("li").has("a.external");
 */
function has(this: Dabby, selector: Selector): Dabby {
	const compare = $(selector).get();
	return $(Array.from(this).filter((node) =>
		compare.some((item) => (node as Node).contains(item as Node))
	));
}

Object.defineProperty(Dabby.prototype, "has", { value: has, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    has(selector: Selector): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __has = typeof has;

