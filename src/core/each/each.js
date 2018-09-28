import $ from "../../core/core.js";
import "../../utils/each/each.js";

$.fn.each = function (callback) {
	$.each(Array.from(this), callback);
	return this;
};
