import $ from "../../core/dabby/dabby.js";

Object.defineProperty($.fn, "slice", {
	value: function (start, end) {
		return $(Array.from(this).slice(start, end));
	}
});
