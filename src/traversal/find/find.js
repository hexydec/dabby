import $ from "../../core/core.js";

$.fn.find = function (selector) {
	return $(selector, this);
};
