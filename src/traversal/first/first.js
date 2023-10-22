import $ from "../../core/dabby/dabby.js";

Object.defineProperty($.fn, "first", {
	value: function () {
		return $(this[0]);
	}
});
