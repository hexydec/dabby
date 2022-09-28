import $ from "../../core/dabby/dabby";
import { Dabby } from "../../core/dabby/types";
import isFunction from "../../internal/isfunction/isfunction";

$.fn.trigger = function (name: string, data: any[]) : Dabby {
	let i = this.length;
	while (i--) {

		// check if the event requested is a native function
		let isFunc = isFunction(this[i][name]);

		// native submit event doesn't trigger event handlers
		if (name === "submit" || !isFunc) {
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
