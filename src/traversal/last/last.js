import $ from "../../core/core.js";

$.fn.last = function () {
	return this.eq(-1);
};
