import $ from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

$.fn.siblings = function (selector) {
	let i = this.length,
		nodes = [];

	while (i--) {
		[...this[i].parentNode.children].forEach(child => {
			if (child !== this[i]) {
				nodes.push(child);
			}
		});
	}
	return $(selector ? filterNodes(nodes, selector) : nodes);
};
