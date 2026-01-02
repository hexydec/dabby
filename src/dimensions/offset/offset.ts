import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import $ from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import getVal from "../../internal/getval/getval.js";
import type {} from "../../modular.js";
import "../../core/each/each.js";

type Coords = { top: number; left: number };
type OffsetCallback = (this: Element, index: number, currentValue: Coords) => Coords;
type CoordsWithPosition = Coords & { position?: string };

// Getter signature
function offset(this: Dabby): Coords | undefined;
// Setter signature
function offset(this: Dabby, coords: Coords | OffsetCallback): Dabby;
// Implementation
function offset(this: Dabby, coords?: Coords | OffsetCallback): Dabby | Coords | undefined {

	// set
	if (coords) {

		// prepare values
		const values = getVal(
			this as unknown as { readonly length: number; readonly [n: number]: Element },
			coords,
			(obj: Element) => $(obj).offset!()
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
			const parentOffset = $(parent).offset!();
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
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    offset: typeof offset;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __offset = typeof offset;

