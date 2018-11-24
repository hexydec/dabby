import $ from "../../core/core.js";
import "../eq/eq.js";

$.fn.last = function () {
	return this.eq(-1);
};
