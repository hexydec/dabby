import $ from "../../core/dabby/dabby";

$.fn.slice = function (start, end) {
	return $(Array.from(this).slice(start, end));
};
