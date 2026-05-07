import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import isPassive from "../../internal/ispassive/ispassive.js";
import "../../traversal/closest/closest.js";
import "../../core/get/get.js";
import "../../utils/each/each.js";

type OnCallback = (this: Element, event: Event, ...args: unknown[]) => void | false;
type EventMap = Record<string, OnCallback>;
type EventsParam = string | EventMap;

type EventRecord = {
	event: string;
	selector?: string;
	data?: unknown;
	callback: OnCallback;
	func: (evt: Event) => void;
	once: boolean;
};

declare global {
	interface Element {
		events?: EventRecord[];
	}
}

function factory(
	obj: Dabby,
	one: boolean,
	events: EventsParam,
	selector?: string | OnCallback | unknown,
	data?: unknown | OnCallback,
	callback?: OnCallback
): Dabby {
	if (obj.length) {

		// sort out args
		if (typeof selector === "function") {
			callback = selector as OnCallback;
			selector = undefined;
		} else if (typeof data === "function") {
			callback = data as OnCallback;
			data = undefined;
		}

		// standardise as plain object
		let eventsObj: EventMap;
		if (!isPlainObject(events)) {
			eventsObj = {};
			eventsObj[events as string] = callback!;
		} else {
			eventsObj = events as EventMap;
		}

		// attach event
		let i = obj.length;
		while (i--) {
			const element = obj[i] as Element;

			// record the original function
			if (!element.events) {
				element.events = [];
			}

			// loop through functions
			($ as typeof $ & { each: (obj: EventMap, callback: (key: string, value: OnCallback) => void) => void }).each(eventsObj, (evt, func) => {
				evt.split(" ").forEach((e) => {

					// record event
					const event: EventRecord = {
						event: e,
						selector: selector as string | undefined,
						data: data,
						callback: func,
						func: (evt: Event) => { // delegate function
							const target = selector ? ($(evt.target as Element) as Dabby & { closest: (selector: string) => Dabby & { get: () => Element[] } }).closest(selector as string).get() : [evt.currentTarget];
							if (target && target.length) {
								const eventWithData = evt as Event & { data?: unknown; _data?: unknown };
								if (eventWithData.data === undefined) {
									eventWithData.data = data; // set data to event object
								} else {
									eventWithData._data = data; // fallback as sometime the property is not writable
								}
								for (let n = 0, len = target.length; n < len; n++) {
									const detail = (evt as CustomEvent).detail;
									const args = Array.isArray(detail) ? detail : [];
									if (func.call(target[n] as Element, evt, ...args) === false) {
										evt.preventDefault();
										evt.stopPropagation();
									}
								}
							}
						},
						once: one
					};
					element.events!.push(event);

					// bind event
					element.addEventListener(e, event.func, { once: one, capture: !!selector, passive: isPassive(e) });
				});
			});
		}
	}
	return obj;
}

/**
 * Bind one or more event callbacks to each element in the collection.
 *
 * Accepts a space-separated event string or a plain object mapping events to
 * handlers. Optionally delegates events to descendants matching a selector,
 * and may pass arbitrary data to the handler via `event.data`. Returning
 * `false` from a handler calls `preventDefault()` and `stopPropagation()` on
 * the native event.
 *
 * @param events - Space-separated event names, or a plain object whose keys are space-separated event names and whose values are handlers
 * @param selector - Optional descendant selector to delegate the event to
 * @param data - Optional data exposed on the handler's event as `event.data` (or `event._data` if `event.data` is read-only)
 * @param callback - Handler invoked when the event fires; `this` is the matched element
 * @returns The original Dabby collection
 *
 * @example
 * import $ from "dabbyjs";
 * import "dabbyjs/events/on/on";
 *
 * $("#save").on("click", (event) => {
 *   event.preventDefault();
 *   saveDocument();
 * });
 */
function on(
	this: Dabby,
	events: EventsParam,
	selector?: string | OnCallback | unknown,
	data?: unknown | OnCallback,
	callback?: OnCallback
): Dabby {
	return factory(this, false, events, selector, data, callback);
}

Object.defineProperty(Dabby.prototype, "on", { value: on, configurable: true });

/**
 * Bind a one-shot event callback that detaches itself after firing once.
 *
 * Behaves identically to {@link on} but each underlying `addEventListener`
 * call uses the `{ once: true }` option, so the handler is removed after its
 * first invocation. Delegation, event data and the `false`-return short-hand
 * for cancelling the event are all supported.
 *
 * @param events - Space-separated event names, or a plain object whose keys are space-separated event names and whose values are handlers
 * @param selector - Optional descendant selector to delegate the event to
 * @param data - Optional data exposed on the handler's event as `event.data`
 * @param callback - Handler invoked the first time the event fires; `this` is the matched element
 * @returns The original Dabby collection
 *
 * @example
 * import $ from "dabbyjs";
 * import "dabbyjs/events/on/on";
 *
 * $(".banner").one("click", function () {
 *   this.classList.add("dismissed");
 * });
 */
function one(
	this: Dabby,
	events: EventsParam,
	selector?: string | OnCallback | unknown,
	data?: unknown | OnCallback,
	callback?: OnCallback
): Dabby {
	return factory(this, true, events, selector, data, callback);
}

Object.defineProperty(Dabby.prototype, "one", { value: one, configurable: true });

// Module augmentation for auto-inferred modular imports
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    on(events: EventMap): this;
    on(events: string, callback: OnCallback): this;
    on(events: string, selector: string, callback: OnCallback): this;
    on(events: string, selector: string, data: unknown, callback: OnCallback): this;
    one(events: EventMap): this;
    one(events: string, callback: OnCallback): this;
    one(events: string, selector: string, callback: OnCallback): this;
    one(events: string, selector: string, data: unknown, callback: OnCallback): this;
  }
}

export type __on = typeof on;
