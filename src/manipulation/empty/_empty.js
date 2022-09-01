import $ from "../../core/dabby/dabby";

$.fn.empty = function () {
	let i = this.length;
	while (i--) {
		while (this[i].firstChild) {
			this[i].removeChild(this[i].firstChild);
		}
	}
	return this;
};
