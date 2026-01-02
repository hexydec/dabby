import type { Dabby } from "../../core/dabby/dabby.js";
import type { PlainObject } from "../isplainobject/isplainobject.js";
import dasherise from "../dasherise/dasherise.js";
import getVal from "../getval/getval.js";

type CSSProps = string | PlainObject;
type CSSValue = string | number | ((this: Element, index: number, currentValue: string) => string | number);

export default function setCss(
	dabby: Dabby,
	props: CSSProps,
	value?: CSSValue
): Dabby {
	let cssProps: PlainObject;

	if (typeof props === "string") {
		cssProps = { [props]: value };
	} else {
		cssProps = props;
	}

	const values: Record<string, unknown[]> = {};

	for (const key in cssProps) {
		const dasherizedKey = dasherise(key);
		const prop = cssProps[key];
		values[dasherizedKey] = getVal(
			dabby as unknown as { readonly length: number; readonly [n: number]: Element },
			prop,
			(obj: Element) => (obj as HTMLElement).style.getPropertyValue(dasherizedKey)
		);
	}

	for (const key in values) {
		const val = values[key];
		let i = dabby.length;
		while (i--) {
			const element = dabby[i] as HTMLElement;
			const value = val[i];
			const stringValue = !value || isNaN(Number(value)) ? String(value) : `${value}px`;
			element.style.setProperty(key, stringValue);
		}
	}

	return dabby;
}
