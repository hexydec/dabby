import $ from "../../core/dabby/dabby.js";
import "../../events/on/on.js";

const copy = (from, to) => {

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

Object.defineProperty($.fn, "clone", {
	value: function (withDataAndEvents = false, deepWithDataAndEvents = null) {

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
	}
});