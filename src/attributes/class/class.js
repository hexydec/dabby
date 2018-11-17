import $ from "../../core/core.js";
import getVal from "../../internal/getval/getval.js";

["addClass", "removeClass", "toggleClass"].forEach(name => {
	$.fn[name] = function (cls) {

		// remove "Class" from name for classList method
		let func = name.substr(0, name.length - 5),
			i = this.length,
			values = getVal(this, cls, obj => obj.className);

		// manage classes on nodes
		while (i--) {
			if (typeof values[i] === "string") {
				values[i] = values[i].split(" ");
			}
			const len = values[i].length;
			for (let n = 0; n < len; n++) {
				this[i].classList[func](values[i][n]);
			}
		}
		return this;
	};
});
