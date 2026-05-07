import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import isPlainObject, { type PlainObject } from "../../internal/isplainobject/isplainobject.js";
import getProp from "../../internal/getprop/getprop.js";
import getVal from "../../internal/getval/getval.js";

type PropValue = unknown | ((this: Element, index: number, currentValue: unknown) => unknown);

/**
 * Retrieves the requested DOM property from the first node in the collection.
 *
 * Use this for live JavaScript properties such as `checked`, `disabled`, `selected`
 * or `tagName` — for HTML attribute strings, use `$.fn.attr()` instead. Property
 * name aliases (e.g. `for` → `htmlFor`) are normalised internally.
 *
 * @param prop - the property name to read
 * @returns the property value, or `undefined` if the collection is empty
 *
 * @example
 * const isChecked = $("#agree").prop("checked");
 */
function prop(this: Dabby, prop: string): unknown;
/**
 * Sets a single DOM property on every node in the collection.
 *
 * @param prop - the property name to set
 * @param value - the value to assign, or a callback receiving `(index, currentValue)` returning the new value
 * @returns the original Dabby collection for chaining
 *
 * @example
 * $("input[type='checkbox']").prop("checked", true);
 */
function prop(this: Dabby, prop: string, value: PropValue): Dabby;
/**
 * Sets multiple DOM properties on every node in the collection.
 *
 * Each value may be a static value or a callback receiving `(index, currentValue)`.
 *
 * @param props - a plain object of property name/value pairs
 * @returns the original Dabby collection for chaining
 *
 * @example
 * $("input").prop({ disabled: false, readOnly: false });
 */
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
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    prop(prop: string): unknown;
    prop(prop: string, value: unknown | ((this: Element, index: number, currentValue: unknown) => unknown)): this;
    prop(props: Record<string, unknown>): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __prop = typeof prop;

