import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";

type EventData = {
	event: string;
	selector?: string;
	data?: unknown;
	callback: EventListener;
};

const copy = (from: Element, to: Element): void => {
	// Copy data
	if (from instanceof HTMLElement && to instanceof HTMLElement) {
		Object.assign(to.dataset, from.dataset);
	}

	// Copy events
	const fromWithEvents = from as Element & { events?: EventData[] };
	if (fromWithEvents.events) {
		const toObj = $(to);
		const events = fromWithEvents.events;

		events.forEach(e => {
			const toObjWithOn = toObj as Dabby & { on?: (event: string, selector: string, data: unknown, callback: EventListener) => Dabby };
			if (toObjWithOn.on) {
				toObjWithOn.on(e.event, e.selector!, e.data, e.callback);
			}
		});
	}
};

/**
 * Clone the items in the collection and return a new collection.
 *
 * By default, only the DOM nodes are cloned. When `withDataAndEvents` is true,
 * data attributes and bound event handlers are copied onto the new nodes;
 * `deepWithDataAndEvents` controls the same behaviour for descendants and
 * defaults to the value of `withDataAndEvents`.
 *
 * @param withDataAndEvents - copy data and event handlers onto the cloned nodes
 * @param deepWithDataAndEvents - copy data and event handlers onto descendants of the cloned nodes
 * @returns a new Dabby collection containing the cloned nodes
 *
 * @example
 * const $copy = $(".card").clone(true);
 */
function clone(
	this: Dabby,
	withDataAndEvents: boolean = false,
	deepWithDataAndEvents: boolean | null = null
): Dabby {
	// Default for arg 2 is the same as arg 1
	if (deepWithDataAndEvents === null) {
		deepWithDataAndEvents = withDataAndEvents;
	}

	// Clone nodes
	let i = this.length;
	const nodes: Node[] = [];

	while (i--) {
		const element = this[i] as Element;
		nodes[i] = element.cloneNode(true);

		// Copy data and events for the new node
		if (withDataAndEvents && nodes[i] instanceof Element) {
			copy(element, nodes[i] as Element);
		}

		// Copy data and events for the new node's children
		if (deepWithDataAndEvents && nodes[i] instanceof Element) {
			const from = element.querySelectorAll("*");
			const to = (nodes[i] as Element).querySelectorAll("*");
			let n = from.length;

			while (n--) {
				copy(from[n], to[n]);
			}
		}
	}

	return $(nodes as Element[]);
}

Object.defineProperty(Dabby.prototype, "clone", { value: clone, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    clone(withDataAndEvents?: boolean, deepWithDataAndEvents?: boolean | null): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __clone = typeof clone;

