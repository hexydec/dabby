import $ from "../../core/core.js";

["show", "hide", "toggle"].forEach((func, n) => {
	$.fn[func] = function () {
		let i = this.length,
			values = ["block", "none"];
		while (i--) {
			this[i].style.display = values[n] || (getComputedStyle(this[i])["display"] === "none" ? "block" : "none");
		}
		return this;
	};
});
