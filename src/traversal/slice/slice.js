import $ from "../../core/core.js";

$.fn.slice = function (start, end) {
	return $(Array.from(this).slice(start, end));
};
