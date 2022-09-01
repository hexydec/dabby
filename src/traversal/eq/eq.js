import $ from "../../core/dabby/dabby.js";

$.fn.eq = function (i) {
	return $(this[i < 0 ? i + this.length : i]);
};
