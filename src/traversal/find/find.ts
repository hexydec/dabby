import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { Selector } from "../../types.js";

/**
 * Find descendants of every item in the collection that match the selector.
 *
 * The selector is evaluated against each element's subtree (not against the
 * elements themselves), and the results are gathered into a single new
 * collection. Equivalent to running `querySelectorAll` once per element and
 * concatenating the results.
 *
 * @param selector - a CSS selector string, node, node array or Dabby collection to search for
 * @returns a new Dabby collection containing the matched descendants
 *
 * @example
 * $(".article").find("a.external");
 */
function find(this: Dabby, selector: Selector): Dabby {
	return $(selector, this);
}

Object.defineProperty(Dabby.prototype, "find", { value: find, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    find(selector: Selector): this;
  }
}

// Export type witness to force TypeScript to include this file's augmentation
export type __find = typeof find;
