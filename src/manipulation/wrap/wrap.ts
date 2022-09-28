import $ from "../../core/dabby/dabby";
import { Content } from "../../core/dabby/types";
import getVal from "../../internal/getval/getval";
import "../wrapall/wrapall";

$.fn.wrap = function (html: Content) {
	let i = this.length,
		values = getVal(this, html);

	while (i--) {
		$(this[i]).wrapAll(values[i]);
	}
	return this;
}
