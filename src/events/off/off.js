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
		if (events && typeof events === "string") {
			const evt = events;
			events = {};
			events[evt] = callback;
		}

		// attach event
		let i = this.length;
		while (i--) {

			// find the original function
			if (this[i].events && this[i].events.length) {
				Array.from(this[i].events).forEach((evt, n) => {

					// remove selected events
					if (events) {
						$.each(events, (list, func) => {
							list.split(" ").forEach(e => {
								if (evt.event.includes(e) && (!func || evt.callback === func) && (!selector || evt.selector === selector)) {

									// remove event listerer
									this[i].removeEventListener(e, evt.func, {capture: !!evt.selector}); // must pass same arguments

									// remove event from events list
									this[i].events.splice(n, 1);
								}
							});
						});

					// remove all events
					} else {

						// remove event listerer
						this[i].removeEventListener(evt.event, evt.func, {capture: !!evt.selector}); // must pass same arguments

						// remove all events from events list
						this[i].events = []; // this wipes all early in the loop, but it saves having to test for this if again
					}
				});
			}
		}
	}
	return this;
};
