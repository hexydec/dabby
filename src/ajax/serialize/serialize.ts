import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import "../../traversal/filter/filter.js";
import "../../core/each/each.js";
import "../../attributes/val/val.js";
import "../param/param.js";

type ParamValue = string | number | boolean | null | string[] | number[];
type SerializedParams = { [key: string]: ParamValue | SerializedParams } | ParamValue[];

function serialize(this: Dabby): string {
	const selector = "input[name]:not([type=file]):not([type=submit]):not([type=radio]):not([type=checkbox]),input[name]:checked,textarea[name],select[name]";

	const add = (name: string, value: ParamValue, params: SerializedParams): SerializedParams => {
		let match: RegExpMatchArray | null;

		if ((match = name.match(/([^\[]*)\[([^\]]*)\](.*)/)) !== null) {
			name = match[1];
			const currentParam = Array.isArray(params) ? {} : (params[name] || {}) as SerializedParams;
			const arr = add(match[2] + match[3], value, currentParam);
			value = arr as unknown as ParamValue;
		}

		if (name !== "") {
			if (!Array.isArray(params)) {
				params[name] = value;
			}
		} else {
			if (!Array.isArray(params)) {
				params = [];
			}
			params = params.concat(Array.isArray(value) ? value : [value]);
		}
		return params;
	};

	let obj = this.filter!(selector);

	if (!obj.length) {
		obj = $(selector, this);
	}

	let params: SerializedParams = {};

	// process values
	obj.each!((_index, element) => {
		const value = $(element).val!();
		if (!(element as HTMLInputElement).disabled && value !== undefined) {
			params = add((element as HTMLInputElement).name, value as ParamValue, params);
		}
	});
	// Ensure params is an object, not an array
	const finalParams = Array.isArray(params) ? { "": params } : params;
	return $.param!(finalParams as unknown as Record<string, string | number | boolean | null | Record<string, unknown> | (string | number | boolean | null)[] | (() => string | number | boolean | null | Record<string, unknown> | (string | number | boolean | null)[])>);
}

Object.defineProperty(Dabby.prototype, "serialize", { value: serialize, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    serialize: typeof serialize;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __serialize = typeof serialize;

