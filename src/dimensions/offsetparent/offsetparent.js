import $ from "../../core/dabby/dabby.js";

Object.defineProperty($.fn, "offsetParent", {
	value: function () {
		return this[0] ? $(this[0].offsetParent) : $();
	}
});
