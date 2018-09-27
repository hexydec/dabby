import $ from "../../core/dabby/dabby.js";
import "../../utils/each/each.js";

$.fn.each = function (callback) {
	$.each(Array.from(this), callback);
	return this;
};
