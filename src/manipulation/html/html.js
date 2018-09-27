import $ from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";

$.fn.html = function (html) {

	// set
	if (html !== undefined) {
		let i = this.length;
		while (i--) {
			this[i].innerHTML = getVal(html, this[i], i, this[i].innerHTML);
		}
		return this;

	// get
	} else if (this[0]) {
		return this[0].innerHTML;
	}
};
