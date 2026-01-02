import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";

type EventRecord = {
	func: (evt: Event) => unknown;
};

function triggerHandler(this: Dabby, _name: string, data?: unknown): unknown {
	let ret: unknown;
	const element = this[0] as Element & { events?: EventRecord[] };
	(element.events || []).forEach((evt) => {
		ret = evt.func.call(element, {
			arg: data,
			target: element,
			currentTarget: element
		} as unknown as Event);
	});
	return ret;
}

Object.defineProperty(Dabby.prototype, "triggerHandler", { value: triggerHandler, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    triggerHandler: typeof triggerHandler;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __triggerHandler = typeof triggerHandler;

