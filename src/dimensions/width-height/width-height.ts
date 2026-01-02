import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import getVal from "../../internal/getval/getval.js";
import type {} from "../../modular.js";

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
function width(this: Dabby): number | undefined;
function width(this: Dabby, val: number | string | DimCallback): Dabby;
function width(this: Dabby, val?: number | string | DimCallback): Dabby | number | undefined {
	return factory(this, "width", 0, val);
}

Object.defineProperty(Dabby.prototype, "width", { value: width, configurable: true });

function innerWidth(this: Dabby): number | undefined;
function innerWidth(this: Dabby, val: number | string | DimCallback): Dabby;
function innerWidth(this: Dabby, val?: number | string | DimCallback): Dabby | number | undefined {
	return factory(this, "innerWidth", 1, val);
}

Object.defineProperty(Dabby.prototype, "innerWidth", { value: innerWidth, configurable: true });

function outerWidth(this: Dabby): number | undefined;
function outerWidth(this: Dabby, val: number | string | boolean | DimCallback): Dabby;
function outerWidth(this: Dabby, val?: number | string | boolean | DimCallback): Dabby | number | undefined {
	return factory(this, "outerWidth", 2, val);
}

Object.defineProperty(Dabby.prototype, "outerWidth", { value: outerWidth, configurable: true });

// Height methods
function height(this: Dabby): number | undefined;
function height(this: Dabby, val: number | string | DimCallback): Dabby;
function height(this: Dabby, val?: number | string | DimCallback): Dabby | number | undefined {
	return factory(this, "height", 3, val);
}

Object.defineProperty(Dabby.prototype, "height", { value: height, configurable: true });

function innerHeight(this: Dabby): number | undefined;
function innerHeight(this: Dabby, val: number | string | DimCallback): Dabby;
function innerHeight(this: Dabby, val?: number | string | DimCallback): Dabby | number | undefined {
	return factory(this, "innerHeight", 4, val);
}

Object.defineProperty(Dabby.prototype, "innerHeight", { value: innerHeight, configurable: true });

function outerHeight(this: Dabby): number | undefined;
function outerHeight(this: Dabby, val: number | string | boolean | DimCallback): Dabby;
function outerHeight(this: Dabby, val?: number | string | boolean | DimCallback): Dabby | number | undefined {
	return factory(this, "outerHeight", 5, val);
}

Object.defineProperty(Dabby.prototype, "outerHeight", { value: outerHeight, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    height: typeof height;
    innerHeight: typeof innerHeight;
    innerWidth: typeof innerWidth;
    outerHeight: typeof outerHeight;
    outerWidth: typeof outerWidth;
    width: typeof width;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __height = typeof height;
export type __innerHeight = typeof innerHeight;
export type __innerWidth = typeof innerWidth;
export type __outerHeight = typeof outerHeight;
export type __outerWidth = typeof outerWidth;
export type __width = typeof width;

