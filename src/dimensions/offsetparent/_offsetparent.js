import $ from "../../core/core.js";

$.fn.offsetParent = function () {
	return this[0] ? $(this[0].offsetParent) : $();
};
