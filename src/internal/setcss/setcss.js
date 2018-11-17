import $ from "../../core/core.js";
import "../../utils/each/each.js";
import getVal from "../getval/getval.js";
import dasherise from "../dasherise/dasherise.js";

export default (dabby, props, value) => {

	// normalise props
	if (typeof props === "string") {
		const name = props;
		props = {};
		props[name] = value;
	}

	// prepare values
	let values = [];
	$.each(props, (i, prop) => {
		values[i] = getVal(dabby, prop, obj => obj.style[i]);
	});

	// set properties
	$.each(values, (key, val) => {
		let i = dabby.length;
		while (i--) {
			if (!isNaN(val)) {
				val += "px";
			}
			dabby[i].style[value === "" ? "removeProperty" : "setProperty"](dasherise(key), val);
		}
	});
	return dabby;
}
