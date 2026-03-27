import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";

type EventRecord = {
	event: string;
	callback: (evt: Event) => unknown;
	func: (evt: Event) => unknown;
};

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

