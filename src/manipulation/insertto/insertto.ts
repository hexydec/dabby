import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import type {} from "../../modular.js";

function factory(func: string, obj: Dabby, selector: Selector): Dabby {
	const target = $(selector);
	(target as Dabby & Record<string, (obj: Dabby) => void>)[func](obj);
	return obj;
}

function insertBefore(this: Dabby, selector: Selector): Dabby {
	return factory("before", this, selector);
}

Object.defineProperty(Dabby.prototype, "insertBefore", { value: insertBefore, configurable: true });

function prependTo(this: Dabby, selector: Selector): Dabby {
	return factory("prepend", this, selector);
}

Object.defineProperty(Dabby.prototype, "prependTo", { value: prependTo, configurable: true });

function appendTo(this: Dabby, selector: Selector): Dabby {
	return factory("append", this, selector);
}

Object.defineProperty(Dabby.prototype, "appendTo", { value: appendTo, configurable: true });

function insertAfter(this: Dabby, selector: Selector): Dabby {
	return factory("after", this, selector);
}

Object.defineProperty(Dabby.prototype, "insertAfter", { value: insertAfter, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    appendTo: typeof appendTo;
    insertAfter: typeof insertAfter;
    insertBefore: typeof insertBefore;
    prependTo: typeof prependTo;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __appendTo = typeof appendTo;
export type __insertAfter = typeof insertAfter;
export type __insertBefore = typeof insertBefore;
export type __prependTo = typeof prependTo;

