import $ from "../../core/core.js";
import getVal from "../../internal/getval/getval.js";

$.fn.text = function (text) {
	let i = this.length,
		output = [];
	if (text === undefined) {
		while (i--) {
			output[i] = this[i].textContent;
		}
		return output.join(" ");
	} else {
		const values = getVal(this, text, obj => obj.textContent);
		while (i--) {
			this[i].textContent = values[i];
		}
		return this;
	}
};
