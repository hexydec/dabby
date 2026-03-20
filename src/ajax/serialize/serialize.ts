import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
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

	let obj = (this as Dabby & { filter: (selector: string) => Dabby }).filter(selector);

	if (!obj.length) {
		obj = $(selector, this);
	}

	let params: SerializedParams = {};

	// process values
	(obj as Dabby & { each: (callback: (_index: number, element: Element) => void) => Dabby }).each((_index: number, element: Element) => {
		const value = ($(element) as Dabby & { val: () => unknown }).val();
		if (!(element as HTMLInputElement).disabled && value !== undefined) {
			params = add((element as HTMLInputElement).name, value as ParamValue, params);
		}
	});
	// Ensure params is an object, not an array
	const finalParams = Array.isArray(params) ? { "": params } : params;
	return ($ as typeof $ & { param: (obj: Record<string, unknown>) => string }).param(finalParams as unknown as Record<string, unknown>);
}

Object.defineProperty(Dabby.prototype, "serialize", { value: serialize, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    serialize(): string;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __serialize = typeof serialize;

