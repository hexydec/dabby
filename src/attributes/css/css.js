import $ from "../../core/dabby/dabby.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import setCss from "../../internal/setcss/setcss.js";
import dasherise from "../../internal/dasherise/dasherise.js";

$.fn.css = function (props, value) {

	// set the values
	if (value !== undefined || isPlainObject(props)) {
		return setCss(this, props, value);
	}

	// retrieve value from first property
	if (this[0]) {
		let name = props,
			i,
			style = getComputedStyle(this[0], ""),
			output = {},
			ret = false;

		// requested single value, normalise to array
		if (typeof name === "string") {
			props = [name];
			ret = true;
		}

		// gather values
		i = props.length;
		while (i--) {
			output[props[i]] = style.getPropertyValue(dasherise(props[i]));
			if (ret) {
				return output[props[i]];
			}
		}
		return output;
	}
};
