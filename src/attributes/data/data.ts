import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import camelise from "../../internal/camelise/camelise.js";

type DataValue = string | number | boolean | object | null;

/**
 * Retrieves all `data-*` values from the first node in the collection as a plain object.
 *
 * Each value is JSON-parsed where possible, so booleans, numbers and objects are
 * returned in their original form. Keys are returned in camelCase.
 *
 * @returns an object containing all data values, or `undefined` if the collection is empty
 *
 * @example
 * const allData = $("#user").data();
 */
function data(this: Dabby): Record<string, unknown>;
/**
 * Retrieves a single `data-*` value from the first node in the collection.
 *
 * The name may be supplied in dash-case or camelCase. The value is JSON-parsed where
 * possible, so booleans, numbers and objects are returned in their original form.
 *
 * @param name - the data attribute name (without the `data-` prefix)
 * @returns the parsed value, or `undefined` if the attribute is not set
 *
 * @example
 * const userId = $("#user").data("user-id");
 */
function data(this: Dabby, name: string): unknown;
/**
 * Sets a single `data-*` value on every node in the collection.
 *
 * Object values are serialised to JSON before being stored on the element's `dataset`.
 *
 * @param name - the data attribute name (without the `data-` prefix)
 * @param value - the value to store
 * @returns the original Dabby collection for chaining
 *
 * @example
 * $("#user").data("status", "active");
 */
function data(this: Dabby, name: string, value: DataValue): Dabby;
/**
 * Sets multiple `data-*` values on every node in the collection.
 *
 * Object values are serialised to JSON before being stored on the element's `dataset`.
 *
 * @param props - a plain object of name/value pairs
 * @returns the original Dabby collection for chaining
 *
 * @example
 * $("#user").data({ role: "admin", verified: true });
 */
function data(this: Dabby, props: Record<string, DataValue>): Dabby;
// Implementation
function data(
	this: Dabby,
	name?: string | Record<string, DataValue>,
	value?: DataValue
): Dabby | Record<string, unknown> | unknown {
	let dataObj: Record<string, DataValue> | undefined;

	// Convert to object format
	if (typeof name === "object") {
		dataObj = name;
	} else if (value !== undefined && typeof name === "string") {
		dataObj = { [name]: value };
	}

	// Set values
	if (dataObj !== undefined) {
		let i = this.length;
		while (i--) {
			const element = this[i] as HTMLElement;
			if (element.dataset) {
				for (const key in dataObj) {
					const val = dataObj[key];
					element.dataset[camelise(key)] =
						typeof val === "object" && val !== null
							? JSON.stringify(val)
							: String(val);
				}
			}
		}
		return this;
	}

	// Get values
	const firstElement = this[0] as HTMLElement | undefined;
	if (firstElement && firstElement.dataset) {
		const parse = (value: string): unknown => {
			try {
				return JSON.parse(value);
			} catch (e) {
				return value;
			}
		};

		// Get all properties
		if (name === undefined) {
			const result: Record<string, unknown> = {};
			for (const key in firstElement.dataset) {
				result[key] = parse(firstElement.dataset[key]!);
			}
			return result;
		}

		// Get specific property
		if (typeof name === "string") {
			const camelisedName = camelise(name);
			const val = firstElement.dataset[camelisedName];
			if (val !== undefined) {
				return parse(val);
			}
		}
	}

	return undefined;
}

Object.defineProperty(Dabby.prototype, "data", { value: data, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    data(): Record<string, unknown>;
    data(name: string): unknown;
    data(name: string, value: string | number | boolean | object | null): this;
    data(props: Record<string, string | number | boolean | object | null>): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __data = typeof data;

