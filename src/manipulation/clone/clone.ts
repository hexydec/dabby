import $ from "../../core/core";
import "../../events/on/on";
import { DabbyEvent } from "../../events/on/on";

type DabbyElement = HTMLElement & {
	events: DabbyEvent[]
}

const copy = (from: DabbyElement, to: DabbyElement) => {

	// copy data
	Object.assign(to.dataset, from.dataset);

	// copy events
	if (from.events) {
		const toObj = $(to);
		from.events.forEach(e => {
			toObj.on(e.event, e.selector, e.data, e.callback);
		});
	}
};

$.fn.clone = function (withDataAndEvents = false, deepWithDataAndEvents: boolean | null = null) {

	// default for arg 2 is the same as arg 1
	if (deepWithDataAndEvents === null) {
		deepWithDataAndEvents = withDataAndEvents;
	}

	// clone nodes
	let i = this.length,
		nodes = [];
	while (i--) {
		nodes[i] = this[i].cloneNode(true);

		// copy data and events for the new node
		if (withDataAndEvents) {
			copy(this[i], nodes[i]);
		}

		// copy data and events for the new node's children
		if (deepWithDataAndEvents) {
			const from = this[i].querySelectorAll("*"),
				to = nodes[i].querySelectorAll("*");
			let n = from.length;
			while (n--) {
				copy(from[n], to[n]);
			}
		}
	}
	return $(nodes);
};
