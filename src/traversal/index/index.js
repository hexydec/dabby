import $ from "../../core/dabby/dabby.js";

$.fn.index = function (selector) {
	if (this[0]) {
		let nodes,
			subject = this[0],
			i;

		// if no selector, match against first elements siblings
		if (selector === undefined) {
			nodes = this[0].parentNode.children;

		// if selector is string, match first node in current collection against resulting collection
		} else if (typeof selector === "string") {
			nodes = $(selector);

		// if element or collection match the element or first node against current collection
		} else {
			nodes = this;
			subject = $(selector)[0];
		}

		i = nodes.length;
		while (i--) {
			if (nodes[i] === subject) {
				return i;
			}
		}
	}
	return -1;
};
