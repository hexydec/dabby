import $ from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

$.fn.children = function (selector) {
	let nodes = [],
		i = this.length;

	while (i--) {
		nodes = [...nodes, ...this[i].children];
	}

	// filter nodes by selector
	return $(selector ? filterNodes(nodes, selector) : nodes);
};
