import $ from "../../core/dabby/dabby";

$.fn.eq = function (i) {
	return $(this[i < 0 ? i + this.length : i]);
};
