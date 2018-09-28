import $ from "../../core/core.js";
import getVal from "../../internal/getval/getval.js";
import "../wrapall/wrapall.js";

$.fn.wrap = function (html) {
	let i = this.length;

	while (i--) {
		$(this[i]).wrapAll(getVal(html, this[i], i));
	}
	return this;
}
