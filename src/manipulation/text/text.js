import $ from "../../core/core.js";
import getVal from "../../internal/getval/getval.js";

$.fn.text = function (text) {
	const get = text === undefined;
	let len = this.length,
		output = [],
		i = 0;
	for (; i < len; i++) {
		if (get) {
			output.push(this[i].textContent);
		} else {
			this[i].textContent = getVal(text, this[i], i, this[i].textContent);
		}
	}
	return get ? output.join(" ") : this;
};
