import $ from "../../core/dabby/dabby.js";

$.fn.last = function () {
	return this.eq(-1);
};
