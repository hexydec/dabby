import $ from "../../core/dabby/dabby";
import getVal from "../../internal/getval/getval.js";

$.fn.text = function (text) {
	let i = this.length,
		output = [];

	// set
	if (text !== undefined) {
		const values = getVal(this, text, obj => obj.textContent);
		while (i--) {
			this[i].textContent = values[i];
		}
		return this;
	}

	// get
	while (i--) {
		output[i] = this[i].textContent;
	}
	return output.join(" ");
};
