import $, {Dabby} from "../../core/dabby/dabby.js";
import isPassive from "../../internal/ispassive/ispassive.js";
import "../../utils/each/each.js";

/**
 * Unbinds event handlers previously bound through 
 * 
 * @memberof Dabby#
 * @function off
 * @type {{
 * 	(events:string, callback:eventCallback) => Dabby;
 * 	(events:string, selector:string, callback:eventCallback) => Dabby;
 * 	(events:object, selector=:string) => Dabby;
 * }}
 * @param {string} events A string containing a space separated list of events to unbind
 * @param {string} selector A string specifying a selector the event to unbind is delegated to
 * @param {eventCallback} callback A callback function to match against the bound handlers for removal
 * @returns {Dabby} The original Dabby collection
 */
const off = function (events, selector, callback) {
	if (this.length) {

		// sort out args
		if (typeof selector === "function") {
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
								this[i].removeEventListener(e, evt.func, {capture: !!evt.selector, passive: isPassive(e)}); // must pass same arguments

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

Object.defineProperty(Dabby.prototype, "off", {value: off});