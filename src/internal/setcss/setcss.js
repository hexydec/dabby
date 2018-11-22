import $ from "../../core/core.js";
import "../../utils/each/each.js";
import getVal from "../getval/getval.js";
import camelise from "../camelise/camelise.js";

export default (dabby, props, value) => {

	// normalise props
	if (typeof props === "string") {
		const name = props;
		props = {};
		props[name] = value;
	}

	// prepare values
	let values = {};
	$.each(props, (i, prop) => {
		values[camelise(i)] = getVal(dabby, prop, obj => obj.style[i]);
	});

	// set properties
	$.each(values, (key, val) => {
		let i = dabby.length;
		while (i--) {
			if (!isNaN(val[i])) {
				val[i] += "px";
			}
			dabby[i].style[key] = val[i];
		}
	});
	return dabby;
}
