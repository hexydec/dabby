import $ from "../../core/core.js";

$.fn.hasClass = function (cls) {
	let i = this.length;
	while (i--) {
		if (this[i].classList.contains(cls)) {
			return true;
		}
	}
	return false;
}
