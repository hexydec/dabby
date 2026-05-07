import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";

/**
 * Trigger an event on every element in the collection.
 *
 * Dispatches a bubbling, cancelable `CustomEvent` so that any handlers
 * attached through `.on()` (or native listeners) are invoked. If the element
 * has a same-named native method (such as `click` or `focus`) it is also
 * called, except for `submit`, which only ever fires through dispatch so
 * that bound handlers receive the event. Any data passed in is exposed on
 * the event as `event.detail` and is spread as additional callback
 * arguments by `.on()`.
 *
 * @param name - The event name to dispatch
 * @param data - Optional payload made available on the dispatched event as `event.detail`; when an array, items are passed as extra callback arguments
 * @returns The original Dabby collection
 *
 * @example
 * import $ from "dabbyjs";
 * import "dabbyjs/events/trigger/trigger";
 *
 * $("#country").val("UK").trigger("change");
 */
function trigger(this: Dabby, name: string, data?: unknown): Dabby {
	let i = this.length;
	while (i--) {
		const element = this[i] as Element & { [key: string]: unknown };
		let isFunc = typeof element[name] === "function";

		// native submit event doesn't trigger event handlers
		if (name === "submit" || !isFunc) {
			const evt = new CustomEvent(name, { bubbles: true, cancelable: true, detail: data });
			element.dispatchEvent(evt);

			// cancel submit event if default is prevented
			if (evt.defaultPrevented) {
				isFunc = false;
			}
		}

		// trigger native event
		if (isFunc) {
			(element[name] as () => void)();
		}
	}
	return this;
}

Object.defineProperty(Dabby.prototype, "trigger", { value: trigger, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    trigger(name: string, data?: unknown): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __trigger = typeof trigger;

