import $ from "../../core/dabby/dabby.js";
import "../eq/eq.js";

$.fn.last = function () {
	return this.eq(-1);
};
