import $ from "../../core/dabby/dabby";
import { Dabby } from "../../core/dabby/types";
import getVal from "../../internal/getval/getval";

type Html = {
	() : string;
	(html: string) : Dabby
};

$.fn.html: Html = function (html?: string) : Dabby | string {

	// set
	if (html !== undefined) {
		let i = this.length,
			values = getVal(this, html, (obj: Element) => obj.innerHTML);
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
