import $ from "../../core/core.js";

["show", "hide", "toggle"].forEach((func, n) => {

	// store for current values
	const display = [],
		obj = [],
		values = ["block", "none"];

	// attach function
	$.fn[func] = function () {
		let i = this.length;
		while (i--) {
			const current = getComputedStyle(this[i]).display,
				item = obj.indexOf(this[i]);
			let value = values[n] || (current === "none" ? "block" : "none");

			// show the item, if value cached, use that
			if (value !== "none" && item > -1) {
				value = display[item];

			// hide the item, cache the current value
			} else if (value === "none" && item === -1 && current !== "none") {
				obj.push(this[i]);
				display.push(current);
			}
			this[i].style.display = value;
		}
		return this;
	};
});
