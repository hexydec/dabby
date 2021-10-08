import $ from "../../core/core.js";
import isFunction from "../../internal/isfunction/isfunction.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import "../../utils/each/each.js";

// add and remove event handlers
$.fn.off = function (events, selector, callback) {
	if (this.length) {

		// sort out args
		if (isFunction(selector)) {
			callback = selector;
			selector = undefined;
		}

		// stadardise as plain object
		if (events && !isPlainObject(events)) {
			const evt = events;
			events = {};
			events[evt] = callback;
		}

		// attach event
		let i = this.length;
		while (i--) {

			// find the original function
			if (this[i].events && this[i].events.length) {

				// remove selected events
				if (events) {
					$.each(events, (evt, func) => {
						evt.split(" ").forEach(e => {
							this[i].events.forEach((evt, n) => {
								if (evt.event.indexOf(e) > -1 && (!func || evt.callback === func) && (!selector || evt.selector === selector)) {

									// remove event listerer
									this[i].removeEventListener(e, evt.func, {capture: !!evt.selector}); // must pass same arguments

									// remove event from events list
									this[i].events.splice(n, 1);
								}
							});
						});
					});

				// remove all events
				} else {
					this[i].events.forEach((evt, n) => {

						// remove event listerer
						this[i].removeEventListener(evt.event, evt.func, {capture: !!evt.selector}); // must pass same arguments

						// remove all events from events list
						this[i].events = [];
					});
				}
			}
		}
	}
	return this;
};
