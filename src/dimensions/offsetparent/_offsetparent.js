import $ from "../../core/dabby/dabby";

$.fn.offsetParent = function () {
	return this[0] ? $(this[0].offsetParent) : $();
};
