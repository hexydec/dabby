import $ from "../../core/dabby/dabby.js";
import "../eq/eq.js";

Object.defineProperty($.fn, "last", {
	value: function () {
		return this.eq(-1);
	}
});