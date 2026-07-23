import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import getVal from "../../internal/getval/getval.js";

type ClassCallback = (this: Element, index: number, currentClass: string) => string | string[];
type ClassValue = string | string[] | ClassCallback;

const funcs = ["remove", "add", "toggle"] as const;

function classFactory(
	obj: Dabby,
	funcIndex: number,
	cls: ClassValue,
	state?: boolean
): Dabby {
	if (obj[0]) {
		let i = obj.length;
		const values = getVal(obj as unknown as { readonly length: number; readonly [n: number]: Element }, cls, (element: Element) => (element as HTMLElement).className);
		let key = funcIndex;

		if (funcIndex > 1 && typeof state === "boolean") {
			key = 0 + Number(state);
		}

		while (i--) {
			let classes = values[i];
			if (typeof classes === "string") {
				classes = classes.split(" ");
			}

			const classList = (obj[i] as Element).classList;
			const funcName = funcs[key];

			if (Array.isArray(classes)) {
				for (let n = 0, len = classes.length; n < len; n++) {
					classList[funcName](classes[n]);
				}
			}
		}
	}
	return obj;
}

/**
 * Removes one or more classes from every node in the collection.
 *
 * @param cls - a class name, a space-separated string of class names, an array of class names, or a callback returning the same
 * @returns the original Dabby collection for chaining
 *
 * @example
 * $(".product-item").removeClass("product-item--selected");
 */
function removeClass(this: Dabby, cls: ClassValue): Dabby {
	return classFactory(this, 0, cls);
}

/**
 * Adds one or more classes to every node in the collection.
 *
 * @param cls - a class name, a space-separated string of class names, an array of class names, or a callback returning the same
 * @returns the original Dabby collection for chaining
 *
 * @example
 * $(".card").addClass("card--active");
 */
function addClass(this: Dabby, cls: ClassValue): Dabby {
	return classFactory(this, 1, cls);
}

/**
 * Toggles one or more classes on every node in the collection.
 *
 * When `state` is supplied, the classes are forced on (`true`) or off (`false`),
 * matching the behaviour of `addClass()` / `removeClass()` respectively. Without
 * `state`, each class is flipped to the opposite of its current state.
 *
 * @param cls - a class name, a space-separated string of class names, an array of class names, or a callback returning the same
 * @param state - optional boolean to force the toggle direction
 * @returns the original Dabby collection for chaining
 *
 * @example
 * $(".navigation").toggleClass("navigation--open");
 */
function toggleClass(this: Dabby, cls: ClassValue, state?: boolean): Dabby {
	return classFactory(this, 2, cls, state);
}

Object.defineProperty(Dabby.prototype, "removeClass", { value: removeClass, configurable: true });
Object.defineProperty(Dabby.prototype, "addClass", { value: addClass, configurable: true });
Object.defineProperty(Dabby.prototype, "toggleClass", { value: toggleClass, configurable: true });

// Module augmentation for auto-inferred modular imports
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    addClass(cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[])): this;
    removeClass(cls?: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[])): this;
    toggleClass(cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[]), state?: boolean): this;
  }
}

export type __addClass = typeof addClass;
export type __removeClass = typeof removeClass;
export type __toggleClass = typeof toggleClass;
