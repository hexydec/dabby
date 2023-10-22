import $ from "../../core/dabby/dabby.js";

Object.defineProperty($.fn, "find", {
	value: function (selector) {
		return $(selector, this);
	}
});
