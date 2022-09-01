import $ from "../../core/dabby/dabby.js";
import "../../utils/each/each.js";

$.fn.each = function (callback) {
	$.each(this, callback);
	return this;
};
