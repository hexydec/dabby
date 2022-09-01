import $ from "../../core/dabby/dabby.js";

$.fn.offsetParent = function () {
	return this[0] ? $(this[0].offsetParent) : $();
};
