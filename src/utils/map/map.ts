import $ from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";

type MapCallback<T, R> = (this: Window, value: T, key: string) => R | R[] | null | undefined;

function map<T, R>(
	obj: Record<string, T> | T[],
	callback: MapCallback<T, R>
): R[] {
	const keys = Object.keys(obj);
	const len = keys.length;
	let arr: R[] = [];

	for (let i = 0; i < len; i++) {
		const key = keys[i];
		const value = Array.isArray(obj) ? obj[parseInt(key)] : obj[key];
		const result = callback.call(window, value, key);

		// Double equals to capture undefined also
		if (result != null) {
			arr = arr.concat(Array.isArray(result) ? result : [result]);
		}
	}

	return arr;
}

$.map = map;

// Augment ModularDabbyStatics for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyStatics {
    map: typeof map;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __map = typeof map;

