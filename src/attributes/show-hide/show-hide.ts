import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";

// Store for current values
const display: string[] = [];
const cache: Element[] = [];
const defaults: string[] = [];
const values = ["none", "block"] as const;

function factory(obj: Dabby, n: number, show?: boolean): Dabby {
	// For toggle they can set the show value
	if (n > 1 && show !== undefined) {
		n = Number(show);
	}

	// Loop through each node
	let i = obj.length;
	while (i--) {
		const element = obj[i] as HTMLElement;
		let item = cache.indexOf(element);
		const current = item > -1 && n < 2 ? null : getComputedStyle(element).display;

		// Cache the initial value
		if (item === -1) {
			item = cache.length;
			cache.push(element);
			display.push(current || "");
			defaults.push(element.style.display);
		}

		// Determine if we are going to show or hide
		let value = values[n] || (current === "none" ? "block" : "none");

		// If show, update the block value to the initial if it was not "none"
		if (value !== "none" && display[item] !== "none") {
			value = display[item] as "block";
		}

		// Update the value, use the default if setting back to initial
		element.style.display = value === display[item] ? defaults[item] : value;
	}
	return obj;
}

function hide(this: Dabby): Dabby {
	return factory(this, 0);
}

function show(this: Dabby): Dabby {
	return factory(this, 1);
}

function toggle(this: Dabby, show?: boolean): Dabby {
	return factory(this, 2, show);
}

Object.defineProperty(Dabby.prototype, "hide", { value: hide, configurable: true });
Object.defineProperty(Dabby.prototype, "show", { value: show, configurable: true });
Object.defineProperty(Dabby.prototype, "toggle", { value: toggle, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    hide: typeof hide;
    show: typeof show;
    toggle: typeof toggle;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __hide = typeof hide;
export type __show = typeof show;
export type __toggle = typeof toggle;

