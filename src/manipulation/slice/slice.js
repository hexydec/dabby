import $ from "../../core/dabby/dabby.js";
import "../../core/get/get.js";

$.fn.slice = function (start, end) {
	return $(this.get().slice(start, end));
};
