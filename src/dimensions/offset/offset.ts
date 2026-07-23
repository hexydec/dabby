import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import $ from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";
import "../../core/each/each.js";

type Coords = { top: number; left: number };
type OffsetCallback = (this: Element, index: number, currentValue: Coords) => Coords;
type CoordsWithPosition = Coords & { position?: string };

/**
 * Retrieve the document-relative coordinates of the first node in the collection.
 *
 * @returns An object with `top` and `left` pixel values, or `undefined` if the collection is empty.
 */
function offset(this: Dabby): Coords | undefined;
/**
 * Set the document-relative coordinates of every node in the collection.
 *
 * If the element's computed position is `static` it is changed to `relative` so the
 * new offset can take effect.
 *
 * @param coords - Either a `{ top, left }` object, or a callback that receives the node index and current value and returns a new `{ top, left }` object.
 * @returns The original Dabby collection for chaining.
 */
function offset(this: Dabby, coords: Coords | OffsetCallback): Dabby;
// Implementation
function offset(this: Dabby, coords?: Coords | OffsetCallback): Dabby | Coords | undefined {

	// set
	if (coords) {

		// prepare values
		const values = getVal(
			this as unknown as { readonly length: number; readonly [n: number]: Element },
			coords,
			(obj: Element) => ($(obj) as Dabby & { offset: () => Coords | undefined }).offset()
		) as CoordsWithPosition[];
		let i = this.length;

		while (i--) {
			const element = this[i] as HTMLElement;

			// set position to relative if not positioned
			let pos = getComputedStyle(element).position;
			if (pos === "static") {
				values[i].position = pos = "relative";
			}

			// take off offset parent position
			const parent = (element as unknown as Record<string, Node>)[pos === "relative" ? "parentNode" : "offsetParent"] as Element;
			const parentOffset = ($(parent) as Dabby & { offset: () => Coords | undefined }).offset();
			if (parentOffset) {
				($ as typeof $ & { each: (obj: Coords, callback: (key: string, value: number) => void) => void }).each(parentOffset, (key, val) => {
					if (key === "top" || key === "left") {
						values[i][key] -= val;
					}
				});
			}

			// relative add inner offset
			if (pos === "relative") {
				const style = getComputedStyle(parent as Element);
				values[i].top -= parseFloat(style.paddingTop) + parseFloat(style.borderTopWidth);
				values[i].left -= parseFloat(style.paddingLeft) + parseFloat(style.borderLeftWidth);
			}
		}

		// update values in one hit to prevent thrashing
		i = this.length;
		while (i--) {
			const element = this[i] as HTMLElement;
			($ as typeof $ & { each: (obj: CoordsWithPosition, callback: (key: string, value: number | string | undefined) => void) => void }).each(values[i], (key, val) => {
				(element.style as unknown as Record<string, string>)[key] = val + (typeof val === "number" && !isNaN(val) ? "px" : "");
			});
		}
		return this;
	}

	// get
	if (this[0]) {
		const element = this[0] as HTMLElement;
		const doc = document.documentElement;
		const pos = element.style.position === "fixed";
		const rect = element.getBoundingClientRect();
		return {
			top: rect.top + (pos ? 0 : doc.scrollTop),
			left: rect.left + (pos ? 0 : doc.scrollLeft)
		};
	}

	return undefined;
}

Object.defineProperty(Dabby.prototype, "offset", { value: offset, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    offset(): { top: number; left: number } | undefined;
    offset(coords: { top: number; left: number } | ((this: Element, index: number, currentValue: { top: number; left: number }) => { top: number; left: number })): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __offset = typeof offset;

