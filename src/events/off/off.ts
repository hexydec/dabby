import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import "../../utils/each/each.js";

type OnCallback = (this: Element, event: Event, ...args: unknown[]) => void | false;
type EventMap = Record<string, OnCallback>;
type EventsParam = string | EventMap | undefined;

type EventRecord = {
	event: string;
	selector?: string;
	callback: OnCallback;
	func: (evt: Event) => void;
};

/**
 * Unbind event handlers previously attached with `.on()` or `.one()`.
 *
 * Without arguments, removes every handler bound through Dabby on each
 * element. With an event string or event map it removes only the matching
 * handlers, optionally narrowed further by a delegation selector and a
 * specific callback reference.
 *
 * @param events - Space-separated event names, or a plain object whose keys are event names and whose values are the handlers to remove. Omit to remove every Dabby-attached handler
 * @param selector - Optional delegation selector that the original handler was bound with
 * @param callback - Optional handler reference; only matching handlers are removed
 * @returns The original Dabby collection
 *
 * @example
 * import $ from "dabbyjs";
 * import "dabbyjs/events/off/off";
 *
 * const onClick = () => console.log("clicked");
 * $("#save").on("click", onClick);
 * $("#save").off("click", onClick);
 */
function off(
	this: Dabby,
	events?: EventsParam,
	selector?: string | OnCallback,
	callback?: OnCallback
): Dabby {
	if (this.length) {

		// sort out args
		if (typeof selector === "function") {
			callback = selector;
			selector = undefined;
		}

		// standardise as plain object
		let eventsObj: EventMap | undefined;
		if (events && typeof events === "string") {
			eventsObj = {};
			eventsObj[events] = callback!;
		} else if (events) {
			eventsObj = events as EventMap;
		}

		// attach event
		let i = this.length;
		while (i--) {
			const element = this[i] as Element & { events?: EventRecord[] };

			// track how many items in the array we are offset by
			let offset = 0;

			// find the original function
			Array.from(element.events || []).forEach((evt, n) => { // must be a copy, as we are editing the array we are looping through

				// remove selected events
				if (eventsObj) {
					($ as typeof $ & { each: (obj: EventMap, callback: (key: string, value: OnCallback) => void) => void }).each(eventsObj, (list, func) => {
						list.split(" ").some((e) => {
							if (evt.event.includes(e) && (!selector || evt.selector === selector) && (!func || evt.callback.toString() === func.toString())) {

								// remove event listener
								element.removeEventListener(e, evt.func, { capture: !!evt.selector } as AddEventListenerOptions); // must pass same arguments

								// remove event from events list
								element.events!.splice(n - offset, 1);
								offset++;
								return true;
							}
							return false;
						});
					});

				// remove all events
				} else {

					// remove event listener
					element.removeEventListener(evt.event, evt.func, { capture: !!evt.selector }); // must pass same arguments

					// remove all events from events list
					element.events = []; // this wipes all early in the loop, but it saves having to test for this if again
				}
			});
		}
	}
	return this;
}

Object.defineProperty(Dabby.prototype, "off", { value: off, configurable: true });

// Module augmentation for auto-inferred modular imports
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    off(): this;
    off(events: EventMap): this;
    off(events: string, callback: OnCallback): this;
    off(events: string, selector: string, callback?: OnCallback): this;
  }
}
