import $ from "../../core/core.js";

$.fn.first = function () {
	return $(this[0]);
};
