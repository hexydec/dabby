import $ from "../../core/core.js";
import "../../utils/isplainobject/isplainobject.js";
import setCss from "../../internal/setcss/setcss.js";
import camelise from "../../internal/camelise/camelise.js";

$.fn.css = function (props, value) {

	// set the values
	if (value !== undefined || $.isPlainObject(props)) {
		return setCss(this, props, value);
	}

	// retrieve value from first property
	if (this[0]) {
		let name = props,
			i,
			style = getComputedStyle(this[0], ""),
			output = {},
			ret = false;

		if (typeof name === "string") {
			props = [name];
			ret = true;
		}
		i = props.length;
		while (i--) {
			output[props[i]] = style[camelise(props[i])];
			if (ret) {
				return output[props[i]];
			}
		}
		return output;
	}
};
