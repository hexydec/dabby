import $ from "../../core/dabby/dabby.js";

Object.defineProperty($.fn, "position", {
	value: function () {
		if (this[0]) {
			return {left: this[0].offsetLeft, top: this[0].offsetTop};
		}
	}
});
