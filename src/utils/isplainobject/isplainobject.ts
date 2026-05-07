import $ from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import type { DabbyFactory } from "../../types.js";

/**
 * Test whether a value is a plain object literal.
 *
 * Returns `true` only for objects whose prototype is `Object.prototype` or
 * `null`. Returns `false` for arrays, DOM nodes, dates, class instances, and
 * primitive values. Useful for guarding deep-merge or copy-on-write logic.
 *
 * @example
 * $.isPlainObject({});            // true
 * $.isPlainObject(Object.create(null)); // true
 * $.isPlainObject([]);            // false
 * $.isPlainObject(new Date());    // false
 */
($ as DabbyFactory & { isPlainObject: typeof isPlainObject }).isPlainObject = isPlainObject;

// Augment ModularDabbyStatics for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyStatics {
    isPlainObject(obj: unknown): boolean;
  }
}

// Export type witness to force TypeScript to include this file's augmentation
export type __isPlainObject = typeof isPlainObject;
