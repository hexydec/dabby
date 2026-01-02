import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import camelise from "../../internal/camelise/camelise.js";
import type {} from "../../modular.js";

type DataValue = string | number | boolean | object | null;

// Getter - all data
function data(this: Dabby): Record<string, unknown>;
// Getter - specific property
function data(this: Dabby, name: string): unknown;
// Setter - single property
function data(this: Dabby, name: string, value: DataValue): Dabby;
// Setter - multiple properties
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
			if (firstElement.dataset.hasOwnProperty(camelisedName)) {
				return parse(firstElement.dataset[camelisedName]!);
			}
		}
	}

	return undefined;
}

Object.defineProperty(Dabby.prototype, "data", { value: data, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    data(): Record<string, unknown>;
    data(name: string): unknown;
    data(name: string, value: unknown): this;
    data(props: Record<string, unknown>): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __data = typeof data;

