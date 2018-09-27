import $ from "../../core/dabby/dabby.js";

$.fn.eq = function (i) {
	const key = i < 0 ? i + this.length : i;
	return $(this[key] || null);
};
