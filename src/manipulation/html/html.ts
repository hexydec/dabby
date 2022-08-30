import $ from "../../core/core";
import getVal from "../../internal/getval/getval";

$.fn.html = function (html: string) {

	// set
	if (html !== undefined) {
		let i = this.length,
			values = getVal(this, html, (obj: HTMLElement) => obj.innerHTML);
		while (i--) {
			this[i].innerHTML = values[i];
		}
		return this;
	}

	// get
	if (this[0]) {
		return this[0].innerHTML;
	}
};
