import type { Dabby } from "../../core/dabby/dabby.js";
import type { PlainObject } from "../isplainobject/isplainobject.js";
import dasherise from "../dasherise/dasherise.js";
import getVal from "../getval/getval.js";

type CSSProps = string | PlainObject;
type CSSValue = string | number | ((this: Element, index: number, currentValue: string) => string | number);

// Properties that receive automatic "px" units when set with numeric values (jQuery 4 allowlist)
const pxProperties = new Set([
	"width", "height", "min-width", "max-width", "min-height", "max-height",
	"top", "right", "bottom", "left",
	"margin", "margin-top", "margin-right", "margin-bottom", "margin-left",
	"padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
	"border-width", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width",
	"flex-basis", "gap", "row-gap", "column-gap",
	"font-size", "outline-width", "outline-offset",
	"text-indent", "letter-spacing", "word-spacing",
]);

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
			let stringValue: string;
			if (!value && value !== 0) {
				stringValue = "";
			} else if (isNaN(Number(value))) {
				stringValue = String(value);
			} else {
				stringValue = pxProperties.has(key) ? `${value}px` : String(value);
			}
			element.style.setProperty(key, stringValue);
		}
	}

	return dabby;
}
