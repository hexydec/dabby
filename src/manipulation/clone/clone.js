import $, {Dabby} from "../../core/dabby/dabby.js";
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

/**
 * Clones the items in the collection, and return a new collection
 * 
 * @memberof Dabby#
 * @function clone
 * @param {bool} withDataAndEvents A boolean indicating whether to clone the data and events attached to the items in the collection
 * @param {bool|null} deepWithDataAndEvents A boolean indicating whether the data and events on the children of cloned elements shold be copied, defaults to the same value as withDataAndEvents
 * @returns {Dabby} A new Dabby collection containing the cloned nodes
 */
const clone = function (withDataAndEvents = false, deepWithDataAndEvents = null) {

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

Object.defineProperty(Dabby.prototype, "clone", {value: clone});