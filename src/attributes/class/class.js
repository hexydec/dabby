import $ from "../../core/core.js";
import getVal from "../../internal/getval/getval.js";

const funcs = [];
["removeClass", "addClass", "toggleClass"].forEach((func, f) => {

	// remove "Class" from name for classList method and remember
	funcs.push(func.substr(0, func.length - 5));

	// create function
	$.fn[func] = function (cls, state) {
		if (this.length) {
			let i = this.length,
				values = getVal(this, cls, obj => obj.className),
				key = f;

			if (func === "toggleClass" && typeof state === "boolean") {
				key = 0 + state;
			}

			// manage classes on nodes
			while (i--) {
				if (typeof values[i] === "string") {
					values[i] = values[i].split(" ");
				}
				for (let n = 0, len = values[i].length; n < len; n++) {
					this[i].classList[funcs[key]](values[i][n]);
				}
			}
		}
		return this;
	};
});
