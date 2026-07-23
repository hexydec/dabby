import $ from "../../core/dabby/dabby.js";
import "../../utils/each/each.js";
import getVal from "../getval/getval.js";
import dasherise from "../dasherise/dasherise.js";

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

export default (dabby, props, value) => {

	// normalise props
	if (typeof props === "string") {
		const name = props;
		props = {};
		props[name] = value;
	}

	// prepare values
	const values = {};
	$.each(props, (i, prop) => {
		i = dasherise(i);
		values[i] = getVal(dabby, prop, obj => obj.style.getPropertyValue(i));
	});

	// set properties
	$.each(values, (key, val) => {
		let i = dabby.length;
		while (i--) {
			const v = val[i];
			let str;
			if (!v && v !== 0) {
				str = "";
			} else if (isNaN(v)) {
				str = String(v);
			} else {
				str = pxProperties.has(key) ? v + "px" : String(v);
			}
			dabby[i].style.setProperty(key, str);
		}
	});
	return dabby;
}
