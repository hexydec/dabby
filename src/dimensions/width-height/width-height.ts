import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import getVal from "../../internal/getval/getval.js";

type DimCallback = (this: Element | Window | Document, index: number, currentValue: number) => number | string;
type DimValue = number | string | boolean | DimCallback;

function factory(
	obj: Dabby,
	dim: string,
	n: number,
	val?: DimValue
): Dabby | number | undefined {
	const width = n < 3;
	const wh = width ? "width" : "height"; // width or height
	const whu = width ? "Width" : "Height"; // with uppercase letter
	const inner = n % 3 === 1;
	const outer = n % 3 === 2;
	const io = inner || outer;
	const pos = width ? ["Left", "Right"] : ["Top", "Bottom"];

	// set value
	if (val !== undefined && typeof val !== "boolean") {
		const values = getVal(
			obj as unknown as { readonly length: number; readonly [n: number]: Element },
			val,
			(element: Element) => {
				const $el = $(element);
				return ($el as Dabby & Record<string, () => number>)[dim]();
			}
		);
		let i = obj.length;
		const props: string[] = [];
		let style: CSSStyleDeclaration;

		while (i--) {
			const element = obj[i] as HTMLElement;

			// add additional lengths
			if (io) {

				// fetch current style and build properties
				pos.forEach((item) => {
					props.push("padding" + item);
					if (outer) {
						props.push("border" + item + "Width");
					}
				});

				// set width to convert to a px value
				const value = values[i];
				if (typeof value === "string" && isNaN(parseFloat(value)) && !value.includes("px")) {
					element.style[wh as "width" | "height"] = value;
					props.push(wh);
					values[i] = 0; // reset to 0
				}

				// add values
				style = getComputedStyle(element);
				props.forEach((prop) => {
					const currentValue = values[i];
			const numValue = typeof currentValue === "number" ? currentValue : parseFloat(currentValue as string);
					values[i] = numValue - parseFloat(style[prop as keyof CSSStyleDeclaration] as string);
				});
			}
			const finalValue = values[i];
			element.style[wh as "width" | "height"] = finalValue + (typeof finalValue === "number" && !isNaN(finalValue) ? "px" : "");
		}
		return obj;
	}

	// get value
	if (obj[0]) {
		const element = obj[0];

		// document
		if ((element as Document).nodeType === 9) { // Node.DOCUMENT_NODE (document)
			return ((element as Document).documentElement as unknown as Record<string, number>)["scroll" + whu];
		}

		// element
		if (element !== window) {
			const htmlElement = element as HTMLElement;
			const rect = htmlElement.getBoundingClientRect();
			const style = getComputedStyle(htmlElement);
			let value = rect[wh as "width" | "height"];
			pos.forEach((item) => {
				if (!io || inner) {
					value -= parseFloat(style[("border" + item) as keyof CSSStyleDeclaration] as string);
					if (!io) {
						value -= parseFloat(style[("padding" + item) as keyof CSSStyleDeclaration] as string);
					}
				} else if (outer && val === true) {
					value += parseFloat(style[("margin" + item) as keyof CSSStyleDeclaration] as string);
				}
			});
			return value;
		}

		// window
		if (inner) {
			return ((window as Window).document.documentElement as unknown as Record<string, number>)["client" + whu];
		}

		return (window as unknown as Record<string, number>)["inner" + whu];
	}

	return undefined;
}

// Width methods
/**
 * Retrieve the content width of the first node in the collection.
 *
 * The returned value excludes padding, border, and margin. For `document` the value
 * is the document `scrollWidth`; for `window` it is the viewport width.
 *
 * @returns The width in pixels, or `undefined` if the collection is empty.
 */
function width(this: Dabby): number | undefined;
/**
 * Set the content width of every node in the collection.
 *
 * @param val - A pixel number, a CSS length string (e.g. `"50%"`, `"10rem"`), or a callback that returns the new width given the index and current value.
 * @returns The original Dabby collection for chaining.
 */
function width(this: Dabby, val: number | string | DimCallback): Dabby;
function width(this: Dabby, val?: number | string | DimCallback): Dabby | number | undefined {
	return factory(this, "width", 0, val);
}

Object.defineProperty(Dabby.prototype, "width", { value: width, configurable: true });

/**
 * Retrieve the inner width of the first node, including padding but excluding border and margin.
 *
 * @returns The inner width in pixels, or `undefined` if the collection is empty.
 */
function innerWidth(this: Dabby): number | undefined;
/**
 * Set the inner width of every node in the collection.
 *
 * The padding is preserved by reducing the underlying CSS `width` so that the
 * resulting padded box matches the requested value.
 *
 * @param val - A pixel number, a CSS length string, or a callback returning the new value.
 * @returns The original Dabby collection for chaining.
 */
function innerWidth(this: Dabby, val: number | string | DimCallback): Dabby;
function innerWidth(this: Dabby, val?: number | string | DimCallback): Dabby | number | undefined {
	return factory(this, "innerWidth", 1, val);
}

Object.defineProperty(Dabby.prototype, "innerWidth", { value: innerWidth, configurable: true });

/**
 * Retrieve the outer width of the first node, including padding and border.
 *
 * Pass `true` to also include the horizontal margin in the returned value.
 *
 * @param includeMargin - When `true`, the left and right margin are added to the result.
 * @returns The outer width in pixels, or `undefined` if the collection is empty.
 */
function outerWidth(this: Dabby): number | undefined;
/**
 * Set the outer width of every node in the collection.
 *
 * @param val - A pixel number, a CSS length string, or a callback returning the new value.
 * @returns The original Dabby collection for chaining.
 */
function outerWidth(this: Dabby, val: number | string | boolean | DimCallback): Dabby;
function outerWidth(this: Dabby, val?: number | string | boolean | DimCallback): Dabby | number | undefined {
	return factory(this, "outerWidth", 2, val);
}

Object.defineProperty(Dabby.prototype, "outerWidth", { value: outerWidth, configurable: true });

// Height methods
/**
 * Retrieve the content height of the first node in the collection.
 *
 * The returned value excludes padding, border, and margin. For `document` the value
 * is the document `scrollHeight`; for `window` it is the viewport height.
 *
 * @returns The height in pixels, or `undefined` if the collection is empty.
 */
function height(this: Dabby): number | undefined;
/**
 * Set the content height of every node in the collection.
 *
 * @param val - A pixel number, a CSS length string (e.g. `"50%"`, `"10rem"`), or a callback that returns the new height given the index and current value.
 * @returns The original Dabby collection for chaining.
 */
function height(this: Dabby, val: number | string | DimCallback): Dabby;
function height(this: Dabby, val?: number | string | DimCallback): Dabby | number | undefined {
	return factory(this, "height", 3, val);
}

Object.defineProperty(Dabby.prototype, "height", { value: height, configurable: true });

/**
 * Retrieve the inner height of the first node, including padding but excluding border and margin.
 *
 * @returns The inner height in pixels, or `undefined` if the collection is empty.
 */
function innerHeight(this: Dabby): number | undefined;
/**
 * Set the inner height of every node in the collection.
 *
 * @param val - A pixel number, a CSS length string, or a callback returning the new value.
 * @returns The original Dabby collection for chaining.
 */
function innerHeight(this: Dabby, val: number | string | DimCallback): Dabby;
function innerHeight(this: Dabby, val?: number | string | DimCallback): Dabby | number | undefined {
	return factory(this, "innerHeight", 4, val);
}

Object.defineProperty(Dabby.prototype, "innerHeight", { value: innerHeight, configurable: true });

/**
 * Retrieve the outer height of the first node, including padding and border.
 *
 * Pass `true` to also include the vertical margin in the returned value.
 *
 * @param includeMargin - When `true`, the top and bottom margin are added to the result.
 * @returns The outer height in pixels, or `undefined` if the collection is empty.
 */
function outerHeight(this: Dabby): number | undefined;
/**
 * Set the outer height of every node in the collection.
 *
 * @param val - A pixel number, a CSS length string, or a callback returning the new value.
 * @returns The original Dabby collection for chaining.
 */
function outerHeight(this: Dabby, val: number | string | boolean | DimCallback): Dabby;
function outerHeight(this: Dabby, val?: number | string | boolean | DimCallback): Dabby | number | undefined {
	return factory(this, "outerHeight", 5, val);
}

Object.defineProperty(Dabby.prototype, "outerHeight", { value: outerHeight, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    height(): number | undefined;
    height(val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
    innerHeight(): number | undefined;
    innerHeight(val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
    innerWidth(): number | undefined;
    innerWidth(val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
    outerHeight(): number | undefined;
    outerHeight(val: number | string | boolean | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
    outerWidth(): number | undefined;
    outerWidth(val: number | string | boolean | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
    width(): number | undefined;
    width(val: number | string | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __height = typeof height;
export type __innerHeight = typeof innerHeight;
export type __innerWidth = typeof innerWidth;
export type __outerHeight = typeof outerHeight;
export type __outerWidth = typeof outerWidth;
export type __width = typeof width;

