import $ from "../../core/dabby/dabby";

$.fn.find = function (selector) {
	return $(selector, this);
};
