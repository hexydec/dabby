import $ from "../../core/core.js";
import "../../core/get/get.js";

$.fn.slice = function (start, end) {
	return $(this.get().slice(start, end));
};
