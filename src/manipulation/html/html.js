import $ from "../../core/core.js";
import getVal from "../../internal/getval/getval.js";

$.fn.html = function (html) {

	// set
	if (html !== undefined) {
		let i = this.length,
			values = getVal(this, html, obj => obj.innerHTML);
		while (i--) {
			this[i].innerHTML = values[i];
		}
		return this;

	// get
	} else if (this[0]) {
		return this[0].innerHTML;
	}
};
