import $ from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";

type EachCallback<T> = (this: T, key: number | string, value: T) => void | false;

/**
 * Iterate over the keys of an array-like or plain object, calling a callback for each.
 *
 * Arrays (and array-likes with a numeric `length`) are iterated in index order;
 * plain objects in `Object.keys` order. Returning `false` from the callback
 * breaks the loop early.
 *
 * @param obj - the object or array-like collection to iterate
 * @param callback - invoked once per entry; bound to the current value with `key` and `value` arguments
 * @returns the original object for chaining
 *
 * @example
 * $.each(["red", "green", "blue"], (i, colour) => console.log(i, colour));
 * $.each({ a: 1, b: 2 }, (key, value) => console.log(key, value));
 */
function each<T>(
	obj: ArrayLike<T> | Record<string, T>,
	callback: EachCallback<T>
): ArrayLike<T> | Record<string, T> {
	const isArr = Array.isArray(obj) || 'length' in obj;
	const keys = isArr ? null : Object.keys(obj);
	const len = isArr ? (obj as ArrayLike<T>).length : (keys as string[]).length;

	for (let i = 0; i < len; i++) {
		const key: number | string = isArr ? i : (keys as string[])[i];
		const value = (obj as any)[key] as T;
		if (callback.call(value, key, value) === false) {
			break;
		}
	}
	return obj;
}

Object.defineProperty($, "each", { value: each });

// Augment ModularDabbyStatics for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyStatics {
    each<T>(obj: ArrayLike<T> | Record<string, T>, callback: (this: T, key: number | string, value: T) => void | false): ArrayLike<T> | Record<string, T>;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __each = typeof each;
