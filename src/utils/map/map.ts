import $ from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";

type MapCallback<T, R> = (this: Window, value: T, key: number | string) => R | R[] | null | undefined;

/**
 * Translate every entry in an array or object into a new flat array.
 *
 * The callback is invoked with `window` as `this`, mirroring jQuery's static
 * `$.map`. Returning an array spreads its values into the result; returning
 * `null` or `undefined` filters the entry out.
 *
 * @param obj - the array or plain object to map over
 * @param callback - invoked once per entry; receives the value and key/index
 * @returns a new flat array of the callback's non-nullish results
 *
 * @example
 * const doubled = $.map([1, 2, 3], (n) => n * 2);
 * // [2, 4, 6]
 *
 * const nonEmpty = $.map({ a: "x", b: "", c: "y" }, (v) => v || null);
 * // ["x", "y"]
 */
function map<T, R>(
	obj: Record<string, T> | T[],
	callback: MapCallback<T, R>
): R[] {
	const isArr = Array.isArray(obj);
	const keys = Object.keys(obj);
	const len = keys.length;
	let arr: R[] = [];

	for (let i = 0; i < len; i++) {
		const key = keys[i];
		const value = isArr ? obj[i] : obj[key];
		const result = callback.call(window, value, isArr ? i : key);

		// Double equals to capture undefined also
		if (result != null) {
			arr = arr.concat(Array.isArray(result) ? result : [result]);
		}
	}

	return arr;
}

$.map = map;

// Augment ModularDabbyStatics for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyStatics {
    map<T, R>(obj: Record<string, T> | T[], callback: (this: Window, value: T, key: number | string) => R | R[] | null | undefined): R[];
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __map = typeof map;

