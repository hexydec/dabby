import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";

type Position = { top: number; left: number };

/**
 * Retrieve the position of the first node relative to its offset parent.
 *
 * Returns the element's `offsetTop` and `offsetLeft` values, which measure the
 * distance to the nearest positioned ancestor (not the document).
 *
 * @returns An object with `top` and `left` pixel values, or `undefined` if the collection is empty.
 */
function position(this: Dabby): Position | undefined {
	if (this[0]) {
		const element = this[0] as HTMLElement;
		return { left: element.offsetLeft, top: element.offsetTop };
	}
	return undefined;
}

Object.defineProperty(Dabby.prototype, "position", { value: position, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    position(): { top: number; left: number } | undefined;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __position = typeof position;

