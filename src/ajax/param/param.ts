import $ from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import "../../utils/each/each.js";

type ParamValue = string | number | boolean | null | ParamValue[] | { [key: string]: ParamValue } | (() => ParamValue);
type ParamObject = { [key: string]: ParamValue };

/**
 * Serialise an object into a URL-encoded query string.
 *
 * Nested objects and arrays are encoded with bracket notation (e.g. `user[name]=Ada`, `tags[]=foo`). Function values are evaluated and their return value is encoded. `null` values become empty strings.
 *
 * @param obj - object to serialise
 * @returns URL-encoded query string (without a leading `?`)
 *
 * @example
 * $.param({ q: "hello world", page: 2 });
 * // => "q=hello%20world&page=2"
 */
function param(obj: ParamObject): string {
	let params: string[] = [];

	const add = (key: string, value: ParamValue, params: string[]): string[] => {
		const isArr = Array.isArray(value);
		if (isArr || (typeof value === "object" && value !== null)) {
			// Iterate over object/array values
			const objValue = value as ParamObject | ParamValue[];
			Object.keys(objValue).forEach((i) => {
				params = add(`${key}[${isArr ? "" : i}]`, (objValue as Record<string, ParamValue>)[i], params);
			});
		} else {
			let finalValue: string | number | boolean | null = value as string | number | boolean | null;
			if (typeof value === "function") {
				finalValue = value() as string | number | boolean | null;
			}
			params.push(encodeURIComponent(key) + "=" + encodeURIComponent(finalValue === null ? "" : String(finalValue)));
		}
		return params;
	};

	// process values
	Object.keys(obj).forEach((key) => {
		params = add(key, obj[key], params);
	});
	return params.join("&");
}

Object.defineProperty($, "param", { value: param });

// Augment ModularDabbyStatics for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyStatics {
    param(obj: { [key: string]: string | number | boolean | null | ParamValue[] | { [key: string]: ParamValue } | (() => ParamValue) }): string;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __param = typeof param;

