import $ from "../../core/dabby/dabby";

$.fn.first = function () {
	return $(this[0]);
};
