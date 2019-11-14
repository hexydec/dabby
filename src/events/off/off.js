import $ from "../../core/core.js";
import "../../utils/isfunction/isfunction.js";

// add and remove event handlers
$.fn.off = function (events, selector, data, callback) {
	if (this.length) {

		// sort out args
		events = events.split(" ");
		if ($.isFunction(selector)) {
			callback = selector;
			selector = undefined;
		} else if ($.isFunction(data)) {
			callback = data;
			data = undefined;
		}

		// attach event
		let i = this.length;
		while (i--) {

			// find the original function
			if (this[i].events.length) {
				let e = events.length;
				while (e--) {
					this[i].events.forEach((evt, n) => {
						const index = evt.events.indexOf(events[e]);
						if (index !== -1 && (!callback || evt.callback === callback) && (!selector || evt.selector === selector)) {
							this[i].removeEventListener(events[e], evt.func, {once: evt.once, capture: !!evt.selector}); // must pass same arguments
							this[i].events[n].events.splice(index, 1);
							if (!this[i].events[n].events.length) {
								this[i].events.splice(n, 1);
							}
						}
					});
				}
			}
		}
	}
	return this;
};
