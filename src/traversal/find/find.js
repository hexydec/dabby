import $ from "../../core/dabby/dabby.js";

$.fn.find = function (selector) {
	return $(selector, this);
};
