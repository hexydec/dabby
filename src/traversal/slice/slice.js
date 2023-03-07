import $ from "../../core/dabby/dabby.js";

$.fn.slice = function (start, end) {
	return $(Array.from(this).slice(start, end));
};
