import $ from "../../core/core.js";

$.fn.slice = function (start, end) {
	return $(this.get().slice(start, end));
};
