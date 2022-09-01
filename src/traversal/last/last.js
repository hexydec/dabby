import $ from "../../core/dabby/dabby";
import "../eq/eq.js";

$.fn.last = function () {
	return this.eq(-1);
};
