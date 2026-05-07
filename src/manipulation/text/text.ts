import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import getVal from "../../internal/getval/getval.js";

type TextValue = string | number | boolean;
type TextCallback = (this: Element, index: number, currentText: string) => TextValue;

/**
 * Retrieve the combined text of every item in the collection.
 *
 * Each element's `textContent` is concatenated (no separator) into a single
 * string. Returns an empty string when the collection is empty.
 *
 * @returns the combined text content of every element in the collection
 *
 * @example
 * const heading = $("h1").text();
 */
// Getter
function text(this: Dabby): string;
/**
 * Set the `textContent` of every item in the collection.
 *
 * Accepts a string, number or boolean — non-string values are coerced via
 * `String()` before being assigned. Pass a callback to compute a new value
 * per element from the element's index and current text. As the value is
 * written via `textContent`, any HTML in the input is rendered as literal
 * text rather than parsed, making this method safe for user-supplied data.
 *
 * @param content - the value to assign, or a callback returning the new value
 * @returns the original Dabby collection
 *
 * @example
 * $(".cart-count").text(3);
 * $(".price").text(function (index, current) {
 *     return "£" + current;
 * });
 */
// Setter
function text(this: Dabby, content: TextValue | TextCallback): Dabby;
// Implementation
function text(this: Dabby, content?: TextValue | TextCallback): Dabby | string {
	let i = this.length;
	const output: string[] = [];

	// Set
	if (content !== undefined) {
		const dabbyCollection = this as unknown as { readonly length: number; readonly [n: number]: Element };
		const values = getVal(dabbyCollection, content, (obj: Element) => obj.textContent ?? "");

		i = this.length;
		while (i--) {
			(this[i] as Element).textContent = String(values[i]);
		}
		return this;
	}

	// Get
	i = this.length;
	while (i--) {
		output[i] = (this[i] as Element).textContent ?? "";
	}
	return output.join("");
}

Object.defineProperty(Dabby.prototype, "text", { value: text, configurable: true });

// Module augmentation for auto-inferred modular imports
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    text(): string;
    text(content: string | number | boolean | ((this: Element, index: number, currentText: string) => string | number | boolean)): this;
  }
}

export type __text = typeof text;
