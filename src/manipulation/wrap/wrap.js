import $ from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";
import "../wrapall/wrapall.js";

$.fn.wrap = function (html) {
	let i = this.length,
		values = getVal(this, html);

	while (i--) {
		$(this[i]).wrapAll(values[i]);
	}
	return this;
}
