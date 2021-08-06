import $ from "../../core/core.js";
import getVal from "../../internal/getval/getval.js";
import isWindow from "../../internal/iswindow/iswindow.js";

["scrollLeft", "scrollTop"].forEach(item => {
	$.fn[item] = function (pos) {
		const top = item === "scrollTop";

		// set
		if (pos !== undefined) {
			let i = this.length,
				tl = top ? "top" : "left",
				values = getVal(this, pos, obj => obj[item]);

			while (i--) {
				if (isWindow(this[i])) {
					let obj = {};
					obj[tl] = values[i];
					this[i].scroll(obj);
				} else {
					this[i][item] = values[i];
				}
			};
			return this;
		}

		// get
		if (this[0]) {
			let key = item;
			if (isWindow(this[0])) {
				key = top ? "pageYOffset" : "pageXOffset";
			}
			return this[0][key];
		}
	};
});
