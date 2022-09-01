import $ from "../../core/dabby/dabby";
import { Selector } from "../../core/dabby/types";
import filterNodes from "../../internal/filternodes/filternodes";

$.fn.children = function (selector: Selector) {
	let nodes: Element[] = [],
		i = this.length;

	while (i--) {
		nodes = [...nodes, ...this[i].children];
	}

	// filter nodes by selector
	return $(selector ? filterNodes(nodes, selector) : nodes);
};
