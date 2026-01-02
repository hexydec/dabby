import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import getVal from "../../internal/getval/getval.js";
import type {} from "../../modular.js";

type ScrollCallback = (this: Element | Window, index: number, currentValue: number) => number;

// Getter signature
function scrollLeft(this: Dabby): number | undefined;
// Setter signature
function scrollLeft(this: Dabby, pos: number | ScrollCallback): Dabby;
// Implementation
function scrollLeft(this: Dabby, pos?: number | ScrollCallback): Dabby | number | undefined {
	return factory(this, "scrollLeft", pos);
}

Object.defineProperty(Dabby.prototype, "scrollLeft", { value: scrollLeft, configurable: true });

// Getter signature
function scrollTop(this: Dabby): number | undefined;
// Setter signature
function scrollTop(this: Dabby, pos: number | ScrollCallback): Dabby;
// Implementation
function scrollTop(this: Dabby, pos?: number | ScrollCallback): Dabby | number | undefined {
	return factory(this, "scrollTop", pos);
}

Object.defineProperty(Dabby.prototype, "scrollTop", { value: scrollTop, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    scrollLeft: typeof scrollLeft;
    scrollTop: typeof scrollTop;
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
