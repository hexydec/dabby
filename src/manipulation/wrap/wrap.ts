import $ from "../../core/core";
import getVal from "../../internal/getval/getval";
import "../wrapall/wrapall";

$.fn.wrap = function (html: string) {
	let i = this.length,
		values = getVal(this, html);

	while (i--) {
		$(this[i]).wrapAll(values[i]);
	}
	return this;
}
