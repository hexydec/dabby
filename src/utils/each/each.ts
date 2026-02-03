import $ from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";

type EachCallback<T> = (this: T, key: number | string, value: T) => void | false;

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
declare module 'dabbyjs' {
  interface ModularDabbyStatics {
    each: typeof each;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __each = typeof each;
