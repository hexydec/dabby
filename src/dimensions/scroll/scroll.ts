import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import getVal from "../../internal/getval/getval.js";

type ScrollCallback = (this: Element | Window, index: number, currentValue: number) => number;

/**
 * Retrieve the horizontal scroll position of the first node in the collection.
 *
 * For `window` the returned value is `pageXOffset`.
 *
 * @returns The current `scrollLeft` value in pixels, or `undefined` if the collection is empty.
 */
function scrollLeft(this: Dabby): number | undefined;
/**
 * Set the horizontal scroll position of every node in the collection.
 *
 * @param pos - The new scroll position in pixels, or a callback that returns the new value given the index and current `scrollLeft`.
 * @returns The original Dabby collection for chaining.
 */
function scrollLeft(this: Dabby, pos: number | ScrollCallback): Dabby;
// Implementation
function scrollLeft(this: Dabby, pos?: number | ScrollCallback): Dabby | number | undefined {
	return factory(this, "scrollLeft", pos);
}

Object.defineProperty(Dabby.prototype, "scrollLeft", { value: scrollLeft, configurable: true });

/**
 * Retrieve the vertical scroll position of the first node in the collection.
 *
 * For `window` the returned value is `pageYOffset`.
 *
 * @returns The current `scrollTop` value in pixels, or `undefined` if the collection is empty.
 */
function scrollTop(this: Dabby): number | undefined;
/**
 * Set the vertical scroll position of every node in the collection.
 *
 * @param pos - The new scroll position in pixels, or a callback that returns the new value given the index and current `scrollTop`.
 * @returns The original Dabby collection for chaining.
 */
function scrollTop(this: Dabby, pos: number | ScrollCallback): Dabby;
// Implementation
function scrollTop(this: Dabby, pos?: number | ScrollCallback): Dabby | number | undefined {
	return factory(this, "scrollTop", pos);
}

Object.defineProperty(Dabby.prototype, "scrollTop", { value: scrollTop, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    scrollLeft(): number | undefined;
    scrollLeft(pos: number | ((this: Element | Window, index: number, currentValue: number) => number)): this;
    scrollTop(): number | undefined;
    scrollTop(pos: number | ((this: Element | Window, index: number, currentValue: number) => number)): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __scrollLeft = typeof scrollLeft;
export type __scrollTop = typeof scrollTop;


function factory(
	obj: Dabby,
	func: "scrollLeft" | "scrollTop",
	pos?: number | ScrollCallback
): Dabby | number | undefined {

	// set
	if (pos !== undefined) {
		let i = obj.length;
		const values = getVal(
			obj as unknown as { readonly length: number; readonly [n: number]: Element | Window },
			pos,
			(element: Element | Window) => (element as unknown as Record<string, number>)[func]
		);

		while (i--) {
			(obj[i] as unknown as Record<string, number>)[func] = values[i] as number;
		}
		return obj;
	}

	// get
	if (obj[0]) {
		const element = obj[0];
		if (element === window) {
			return func === "scrollTop" ? window.pageYOffset : window.pageXOffset;
		}
		return (element as unknown as Record<string, number>)[func];
	}

	return undefined;
}
