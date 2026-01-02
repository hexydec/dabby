import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import isPlainObject, { type PlainObject } from "../../internal/isplainobject/isplainobject.js";
import type {} from "../../modular.js";
import setCss from "../../internal/setcss/setcss.js";
import type {} from "../../modular.js";
import dasherise from "../../internal/dasherise/dasherise.js";
import type {} from "../../modular.js";

type CSSCallback = (this: Element, index: number, currentValue: string) => string | number;
type CSSValue = string | number | CSSCallback;

// Getter overload - single property
function css(this: Dabby, prop: string): string;
// Getter overload - multiple properties
function css(this: Dabby, props: string[]): Record<string, string>;
// Setter overload - single property with value
function css(this: Dabby, prop: string, value: CSSValue): Dabby;
// Setter overload - object of properties
function css(this: Dabby, props: PlainObject): Dabby;
// Implementation
function css(
	this: Dabby,
	props: string | string[] | PlainObject,
	value?: CSSValue
): string | Record<string, string> | Dabby {
	// Set values
	if (value !== undefined || isPlainObject(props)) {
		return setCss(this, props as string | PlainObject, value);
	}

	// Retrieve value from first element
	if (this[0]) {
		const style = getComputedStyle(this[0] as Element);
		let output: Record<string, string> = {};

		// Single value requested
		if (typeof props === "string") {
			return style.getPropertyValue(dasherise(props));
		}

		// Multiple values requested
		for (let i = props.length - 1; i >= 0; i--) {
			output[props[i]] = style.getPropertyValue(dasherise(props[i]));
		}
		return output;
	}

	return typeof props === "string" ? "" : {};
}

Object.defineProperty(Dabby.prototype, "css", { value: css, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    css(prop: string): string;
    css(props: string[]): Record<string, string>;
    css(prop: string, value: string | number | ((this: Element, index: number, currentValue: string) => string | number)): this;
    css(props: Record<string, string | number>): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __css = typeof css;

