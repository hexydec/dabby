import $ from "../../core/dabby/dabby";
import { Content, Dabby } from "../../core/dabby/types";
import filterNodes from "../../internal/filternodes/filternodes";

$.fn.children = function (selector: Content) : Dabby {
	let nodes: Element[] = [],
		i = this.length;

	while (i--) {
		nodes = [...nodes, ...this[i].children];
	}

	// filter nodes by selector
	return $(selector ? filterNodes(nodes, selector) : nodes);
};
