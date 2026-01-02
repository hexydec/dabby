import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import isPlainObject, { type PlainObject } from "../../internal/isplainobject/isplainobject.js";
import type {} from "../../modular.js";
import getProp from "../../internal/getprop/getprop.js";
import type {} from "../../modular.js";
import getVal from "../../internal/getval/getval.js";
import type {} from "../../modular.js";

type PropValue = unknown | ((this: Element, index: number, currentValue: unknown) => unknown);

// Getter
function prop(this: Dabby, prop: string): unknown;
// Setter - single property
function prop(this: Dabby, prop: string, value: PropValue): Dabby;
// Setter - multiple properties
function prop(this: Dabby, props: PlainObject): Dabby;
// Implementation
function prop(
	this: Dabby,
	prop: string | PlainObject,
	value?: PropValue
): Dabby | unknown {
	const isObj = isPlainObject(prop);

	// Set
	if (value !== undefined || isObj) {
		if (this[0]) {
			let propsObj: PlainObject;

			// Normalise values
			if (!isObj) {
				propsObj = { [prop as string]: value };
			} else {
				propsObj = prop;
			}

			// Set properties
			for (let key in propsObj) {
				const normalisedKey = getProp(key);
				const val = propsObj[key];
				const dabbyCollection = this as unknown as { readonly length: number; readonly [n: number]: Element };
				const values = getVal(
					dabbyCollection,
					val,
					(obj: Element) => (obj as unknown as Record<string, unknown>)[normalisedKey]
				);

				let i = this.length;
				while (i--) {
					(this[i] as unknown as Record<string, unknown>)[normalisedKey] = values[i];
				}
			}
		}
		return this;
	}

	// Get
	if (this[0]) {
		return (this[0] as unknown as Record<string, unknown>)[getProp(prop as string)];
	}

	return undefined;
}

Object.defineProperty(Dabby.prototype, "prop", { value: prop, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    prop: typeof prop;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __prop = typeof prop;

