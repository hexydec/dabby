import $ from "../../core/core.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

$.fn.children = function (selector) {
	let nodes = [],
		i = this.length;

	while (i--) {
		nodes = nodes.concat(Array.from(this[i].children));
	}

	// filter nodes by selector
	return $(selector ? filterNodes(nodes, selector) : nodes);
};
