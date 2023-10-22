import $ from "../../core/dabby/dabby.js";
import getProp from "../../internal/getprop/getprop.js";

Object.defineProperty($.fn, "removeProp", {
	value: function (prop) {
		let i = this.length;
		prop = getProp(prop);

		while (i--) {
			delete this[i][prop];
		}
		return this;
	}
});