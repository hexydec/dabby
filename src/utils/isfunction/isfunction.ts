import $ from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import isFunction from "../../internal/isfunction/isfunction.js";
import type { DabbyFactory } from "../../types.js";

/**
 * Test whether a value is callable.
 *
 * Mirrors jQuery's static `$.isFunction`. Returns `true` for any value whose
 * `typeof` is `"function"` (regular functions, arrow functions, classes, and
 * generator functions), and `false` for everything else.
 *
 * @example
 * $.isFunction(() => {}); // true
 * $.isFunction(null);     // false
 */
($ as DabbyFactory & { isFunction: typeof isFunction }).isFunction = isFunction;

// Augment ModularDabbyStatics for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyStatics {
    isFunction(value: unknown): value is Function;
  }
}

// Export a type witness to force TypeScript to include this file's augmentation
export type __isFunction = typeof isFunction;
