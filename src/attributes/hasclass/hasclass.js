import $ from "../../core/dabby/dabby.js";

Object.defineProperty($.fn, "hasClass", {
	value: function (cls) {
		let i = this.length;
		while (i--) {
			if (this[i].classList.contains(cls)) {
				return true;
			}
		}
		return false;
	}
});
