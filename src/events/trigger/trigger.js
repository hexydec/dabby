import $ from "../../core/core.js";
import "../../utils/isfunction/isfunction.js";

$.fn.trigger = function (name, data) {
	let i = this.length;
	while (i--) {
		if ($.isFunction(this[i][name])) {
			this[i][name]();
		} else {
			const evt = new CustomEvent(name, {bubbles: true, cancelable: true});
			evt.args = data;
			this[i].dispatchEvent(evt);
		}
	}
	return this;
};
