import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";

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
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    trigger: typeof trigger;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __trigger = typeof trigger;

