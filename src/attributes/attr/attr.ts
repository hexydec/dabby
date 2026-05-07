import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import events from "../../internal/getevents/getevents.js";
import getVal from "../../internal/getval/getval.js";

type AttrValue = string | number | null | ((this: Element, index: number, currentValue: string | null) => string | number | null);

/**
 * Retrieves the requested attribute from the first node in a collection.
 *
 * @param prop - the name of the attribute to read
 * @returns the attribute value, or `null` if the attribute is not set or the collection is empty
 *
 * @example
 * const href = $("a.external").attr("href");
 */
function attr(this: Dabby, prop: string): string | null;
/**
 * Sets a single attribute on every node in the collection.
 *
 * Passing `null` removes the attribute. The special keys `class`, `style` and `text`
 * map onto `className`, `style.cssText` and `textContent` respectively. Event names
 * (e.g. `click`) are delegated to `$.fn.on()`.
 *
 * @param prop - the name of the attribute to set
 * @param value - the value to assign, or a callback receiving `(index, currentValue)` returning the new value
 * @returns the original Dabby collection for chaining
 *
 * @example
 * $("a.external").attr("target", "_blank");
 */
function attr(this: Dabby, prop: string, value: AttrValue): Dabby;
/**
 * Sets multiple attributes on every node in the collection.
 *
 * Each value may be a static value or a callback receiving `(index, currentValue)`.
 *
 * @param props - a plain object of attribute name/value pairs
 * @returns the original Dabby collection for chaining
 *
 * @example
 * $("img.hero").attr({ alt: "Sunset over the harbour", loading: "lazy" });
 */
function attr(this: Dabby, props: Record<string, AttrValue | Function>): Dabby;
// Implementation
function attr(
	this: Dabby,
	prop: string | Record<string, AttrValue | Function>,
	value?: AttrValue
): Dabby | string | null {
	const isObj = typeof prop !== "string";
	let propsObj: Record<string, AttrValue | Function>;

	// Set properties
	if (isObj || value !== undefined) {
		// Normalise to object
		if (!isObj) {
			propsObj = { [prop as string]: value! };
		} else {
			propsObj = prop;
		}

		for (const key in propsObj) {
			const val = propsObj[key];

			// If event, hand it off to $.fn.on()
			if (events.includes(key as (typeof events)[number])) {
				// This will be available when events module is converted
				(this as Dabby & { on?: (event: string, handler: unknown) => void }).on?.(key, val);
			} else {
				// Process other values
				let i = this.length;
				const dabbyCollection = this as unknown as { readonly length: number; readonly [n: number]: Element };
				const values = getVal(
					dabbyCollection,
					val,
					(obj: Element) => {
						const $obj = $(obj);
						return ($obj as Dabby & { attr?: (key: string) => string | null }).attr?.(key) ?? null;
					}
				);

				while (i--) {
					const element = this[i] as Element & { style: CSSStyleDeclaration; className: string; textContent: string };

					switch (key) {
						case "style":
							element.style.cssText = String(values[i] ?? "");
							break;
						case "class":
							element.className = String(values[i] ?? "");
							break;
						case "text":
							element.textContent = String(values[i] ?? "");
							break;
						default:
							if (values[i] === null) {
								element.removeAttribute(key);
							} else {
								element.setAttribute(key, String(values[i]));
							}
					}
				}
			}
		}
		return this;
	}

	// Read attribute
	const firstElement = this[0] as Element | undefined;
	if (firstElement) {
		const propName = prop as string;

		// Retrieve special properties
		if (propName === "style") {
			return (firstElement as HTMLElement).style.cssText;
		}
		if (propName === "class") {
			return firstElement.className;
		}
		return firstElement.getAttribute(propName);
	}

	return null;
}

Object.defineProperty(Dabby.prototype, "attr", { value: attr, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    attr(prop: string): string | null;
    attr(prop: string, value: string | number | null | ((this: Element, index: number, currentValue: string | null) => string | number | null)): this;
    attr(props: Record<string, string | number | null | Function>): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __attr = typeof attr;

