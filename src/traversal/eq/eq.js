import $ from "../../core/core.js";

$.fn.eq = function (i) {
	const key = i < 0 ? i + this.length : i;
	return $(this[key] || null);
};
