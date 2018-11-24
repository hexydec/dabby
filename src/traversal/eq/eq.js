import $ from "../../core/core.js";

$.fn.eq = function (i) {
	return $(this[i < 0 ? i + this.length : i]);
};
