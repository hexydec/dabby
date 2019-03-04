import $ from "../../core/core.js";
import "../../utils/isfunction/isfunction.js";

$.fn.trigger = function (name, data) {
	let i = this.length;
	while (i--) {
		const isFunc = $.isFunction(this[i][name]);

		// native submit event doesn't trigger event handlers
		if (name == "submit" || !isFunc) {
			const evt = new CustomEvent(name, {bubbles: true, cancelable: true});
			evt.args = data;
			this[i].dispatchEvent(evt);
		}

		// trigger native event
		if (isFunc) {
			this[i][name]();
		}
	}
	return this;
};
