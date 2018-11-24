import $ from "../../core/core.js";
import getVal from "../../internal/getval/getval.js";
import "../../utils/iswindow/iswindow.js";

["scrollLeft", "scrollTop"].forEach(item => {
	$.fn[item] = function (pos) {
		const top = item === "scrollTop";

		// set
		if (pos !== undefined) {
			let i = this.length,
				tl = top ? "top" : "left",
				values = getVal(this, pos, obj => obj[item]);
			
			while (i--) {
				if ($.isWindow(this[i])) {
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
			if ($.isWindow(this[0])) {
				item = top ? "pageYOffset" : "pageXOffset";
			}
			return this[0][item];
		}
	};
});
