import $ from "../../core/dabby/dabby";
import getProp from "../../internal/getprop/getprop.js";

$.fn.removeProp = function (prop) {
	let i = this.length;
	prop = getProp(prop);

	while (i--) {
		delete this[i][prop];
	}
	return this;
};
