import $ from "../../core/dabby/dabby.js";
import isFunction from "../../internal/isfunction/isfunction.js";

$.fn.trigger = function (name, data) {
	let i = this.length;
	while (i--) {
		let isFunc = isFunction(this[i][name]);

		// native submit event doesn't trigger event handlers
		if (name == "submit" || !isFunc) {
			const evt = new CustomEvent(name, {bubbles: true, cancelable: true, detail: data});
			this[i].dispatchEvent(evt);

			// cancel submit event if default is prevented
			if (evt.defaultPrevented) {
				isFunc = false;
			}
		}

		// trigger native event
		if (isFunc) {
			this[i][name]();
		}
	}
	return this;
};
