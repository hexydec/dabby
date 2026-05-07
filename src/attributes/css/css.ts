import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import isPlainObject, { type PlainObject } from "../../internal/isplainobject/isplainobject.js";
import setCss from "../../internal/setcss/setcss.js";
import dasherise from "../../internal/dasherise/dasherise.js";

type CSSCallback = (this: Element, index: number, currentValue: string) => string | number;
type CSSValue = string | number | CSSCallback;

/**
 * Retrieves a computed CSS property value from the first node in the collection.
 *
 * Property names may be supplied in dash-case or camelCase.
 *
 * @param prop - the property name to read
 * @returns the computed value as a string, or an empty string if the collection is empty
 *
 * @example
 * const colour = $(".card").css("background-color");
 */
function css(this: Dabby, prop: string): string;
/**
 * Retrieves several computed CSS property values from the first node in the collection.
 *
 * The returned object preserves the keys exactly as supplied (dash-case or camelCase).
 *
 * @param props - an array of property names to read
 * @returns an object keyed by the requested property names containing computed values
 *
 * @example
 * const box = $(".card").css(["border-color", "border-width"]);
 */
function css(this: Dabby, props: string[]): Record<string, string>;
/**
 * Sets a single CSS property on every node in the collection.
 *
 * Numeric values are passed through unchanged — pixel suffixing is delegated to the
 * browser's `style` setter.
 *
 * @param prop - the property name to set, in dash-case or camelCase
 * @param value - the value to assign, or a callback receiving `(index, currentValue)` returning the new value
 * @returns the original Dabby collection for chaining
 *
 * @example
 * $(".card").css("background-color", "#0055aa");
 */
function css(this: Dabby, prop: string, value: CSSValue): Dabby;
/**
 * Sets multiple CSS properties on every node in the collection.
 *
 * Each value may be a static value or a callback receiving `(index, currentValue)`.
 *
 * @param props - a plain object of property name/value pairs
 * @returns the original Dabby collection for chaining
 *
 * @example
 * $(".card").css({ backgroundColor: "#0055aa", padding: "1rem" });
 */
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
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    css(prop: string): string;
    css(props: string[]): Record<string, string>;
    css(prop: string, value: string | number | ((this: Element, index: number, currentValue: string) => string | number)): this;
    css(props: Record<string, string | number>): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __css = typeof css;

