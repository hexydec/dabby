import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";

type EventRecord = {
	event: string;
	callback: (evt: Event) => unknown;
	func: (evt: Event) => unknown;
};

/**
 * Invoke handlers bound to the first element without dispatching a real event.
 *
 * Walks the events recorded on the first element in the collection and calls
 * each one whose name matches, supplying a synthetic event object with
 * `target`, `currentTarget` and `arg` properties. Unlike `.trigger()`, no
 * native event is dispatched, the event does not bubble and no default
 * browser behaviour is invoked, which makes it useful for treating handlers
 * as ordinary functions with a return value.
 *
 * @param name - The event name whose bound handlers should be invoked
 * @param data - Optional value exposed on the synthetic event as `arg`
 * @returns The return value of the last matching handler, or `undefined` when no handler runs
 *
 * @example
 * import $ from "dabbyjs";
 * import "dabbyjs/events/triggerhandler/triggerhandler";
 *
 * $("form").on("validate", function () {
 *   return this.checkValidity();
 * });
 *
 * const isValid = $("form").triggerHandler("validate");
 */
function triggerHandler(this: Dabby, name: string, data?: unknown): unknown {
	const element = this[0] as (Element & { events?: EventRecord[] }) | undefined;
	if (!element) {
		return undefined;
	}
	let ret: unknown;
	(element.events || []).forEach((evt) => {
		if (evt.event === name) {
			ret = evt.callback.call(element, {
				arg: data,
				target: element,
				currentTarget: element
			} as unknown as Event);
		}
	});
	return ret;
}

Object.defineProperty(Dabby.prototype, "triggerHandler", { value: triggerHandler, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    triggerHandler(name: string, data?: unknown): unknown;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __triggerHandler = typeof triggerHandler;

