import $ from "../../core/core.js";

// store for current values
const display = [],
	obj = [],
	defaults = [],
	values = ["none", "block"];

["hide", "show", "toggle"].forEach((func, n) => {

	// attach function
	$.fn[func] = function (show) {

		// for toggle they can set the show value
		if (n === 2 && show !== undefined) {
			n = parseInt(show);
		}

		// loop through each node
		let i = this.length;
		while (i--) {
			let item = obj.indexOf(this[i]),
				current = item > -1 && n < 2 ? null : getComputedStyle(this[i]).display;

			// cache the initial value of the current
			if (item === -1) {
				item = obj.length;
				obj.push(this[i]);
				display.push(current);
				defaults.push(this[i].style.display);
			}

			// determine if we are going to show or hide
			let value = values[n] || (current === "none" ? "block" : "none");

			// if show update the block value to the initial if it was not "none"
			if (value !== "none" && display[item] !== "none") {
				value = display[item];
			}

			// update the value, use the default if setting back to initial
			this[i].style.display = value === display[item] ? defaults[item] : value;
		}
		return this;
	};
});
