import $ from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import isArray from "../../internal/isarray/isarray.js";
import type { DabbyFactory } from "../../types.js";

/**
 * Test whether a value is an array.
 *
 * Mirrors jQuery's static `$.isArray`, which is a thin wrapper around the
 * native `Array.isArray`. Returns `true` only for genuine arrays (including
 * arrays from other realms), and `false` for array-like values such as
 * `NodeList` or `arguments`.
 *
 * @example
 * $.isArray([1, 2, 3]);          // true
 * $.isArray(document.body.children); // false
 */
($ as DabbyFactory & { isArray: typeof isArray }).isArray = isArray;

// Augment ModularDabbyStatics for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyStatics {
    isArray(value: unknown): value is unknown[];
  }
}

// Export a type witness to force TypeScript to include this file's augmentation
export type __isArray = typeof isArray;
