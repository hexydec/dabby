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

			// track how many items in the array we are offset by
			let offset = 0;

			// find the original function
			Array.from(this[i].events || []).forEach((evt, n) => { // must be a copy, as we are editing the array we are looping through

				// remove selected events
				if (events) {
					$.each(events, (list, func) => {
						list.split(" ").some(e => {
							if (evt.event.includes(e) && (!selector || evt.selector === selector) && (!func || evt.callback.toString() === func.toString())) {

								// remove event listerer
								this[i].removeEventListener(e, evt.func, {capture: !!evt.selector}); // must pass same arguments

								// remove event from events list
								this[i].events.splice(n - offset, 1);
								offset++;
								return true;
							}
							return false;
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
	return this;
};
