import $ from "../../core/dabby/dabby.js";

Object.defineProperty($.fn, "empty", {
	value: function () {
		let i = this.length;
		while (i--) {
			while (this[i].firstChild) {
				this[i].removeChild(this[i].firstChild);
			}
		}
		return this;
	}
});
