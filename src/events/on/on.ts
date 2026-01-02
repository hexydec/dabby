import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
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
							const target = selector ? $(evt.target as Element).closest?.(selector as string).get() : [evt.currentTarget];
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
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    on(events: string | Record<string, (this: Element, event: Event, ...args: unknown[]) => void | false>, selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
    one(events: string | Record<string, (this: Element, event: Event, ...args: unknown[]) => void | false>, selector?: string | unknown, data?: unknown, callback?: (this: Element, event: Event, ...args: unknown[]) => void | false): this;
  }
}

export type __on = typeof on;
