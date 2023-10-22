import $ from "../../core/dabby/dabby.js";

Object.defineProperty($.fn, "eq", {
	value: function (i) {
		return $(this[i < 0 ? i + this.length : i]);
	}
});
