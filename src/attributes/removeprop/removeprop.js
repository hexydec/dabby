import $ from "../../core/dabby/dabby.js";
import getProp from "../../internal/getprop/getprop.js";

$.fn.removeProp = function (prop) {
	if (this[0]) {
		let i = this.length;
		prop = getProp(prop);

		while (i--) {
			delete this[i][prop];
		}
		return this;
	}
};
