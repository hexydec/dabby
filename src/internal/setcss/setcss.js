import $ from "../../core/dabby/dabby.js";
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
	const values = {};
	$.each(props, (i, prop) => {
		i = dasherise(i);
		values[i] = getVal(dabby, prop, obj => obj.style.getPropertyValue(i));
	});

	// set properties
	$.each(values, (key, val) => {
		let i = dabby.length;
		while (i--) {
			dabby[i].style.setProperty(key, val[i] + (!val[i] || isNaN(val[i]) ? "" : "px")); // set empty string to remove
		}
	});
	return dabby;
}
