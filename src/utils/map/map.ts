import $ from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";

type MapCallback<T, R> = (this: Window, value: T, key: number | string) => R | R[] | null | undefined;

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
declare module '../../modular.js' {
  interface ModularDabbyStatics {
    map<T, R>(obj: Record<string, T> | T[], callback: (this: Window, value: T, key: number | string) => R | R[] | null | undefined): R[];
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __map = typeof map;

