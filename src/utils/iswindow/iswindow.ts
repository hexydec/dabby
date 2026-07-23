import $ from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import isWindow from "../../internal/iswindow/iswindow.js";
import type { DabbyFactory } from "../../types.js";

/**
 * Test whether a value is the global `window` object.
 *
 * Mirrors jQuery's static `$.isWindow`. The check compares the value's `window`
 * property to itself, which is only true for `window` (and `Window` aliases
 * such as iframe globals).
 *
 * @example
 * $.isWindow(window);  // true
 * $.isWindow(document); // false
 */
($ as DabbyFactory & { isWindow: typeof isWindow }).isWindow = isWindow;

// Augment ModularDabbyStatics for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyStatics {
    isWindow(value: unknown): value is Window;
  }
}

// Export a type witness to force TypeScript to include this file's augmentation
export type __isWindow = typeof isWindow;
