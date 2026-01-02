import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import events from "../../internal/getevents/getevents.js";
import type {} from "../../modular.js";
import getVal from "../../internal/getval/getval.js";
import type {} from "../../modular.js";

type AttrValue = string | number | null | ((this: Element, index: number, currentValue: string | null) => string | number | null);

// Getter
function attr(this: Dabby, prop: string): string | null;
// Setter - single property
function attr(this: Dabby, prop: string, value: AttrValue): Dabby;
// Setter - multiple properties
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
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    attr(prop: string): string | null;
    attr(prop: string, value: string | number | null | ((this: Element, index: number, currentValue: string | null) => string | number | null)): this;
    attr(props: Record<string, string | number | null | Function>): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __attr = typeof attr;

