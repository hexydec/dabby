import $ from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

["next", "nextAll", "nextUntil", "prev", "prevAll", "prevUntil"].forEach(func => {
	$.fn[func] = function (selector, filter) {
		const next = func.indexOf("next") > -1,
			all = func.indexOf("All") > -1,
			until = func.indexOf("Until") > -1,
			method = next ? "nextElementSibling" : "previousElementSibling";
		let nodes = [],
			i = this.length,
			sibling;

		// look through each node and get siblings
		while (i--) {
			sibling = this[i][method];
			while (sibling) {
				nodes.push(sibling);
				if (all || (until && filterNodes(sibling, selector).length)) {
					break;
				} else {
					sibling = sibling[method];
				}
			}
		}

		// swap args for *Until methods
		if (until) {
			selector = filter;
		}

		// filter siblings by selector
		if (selector) {
			nodes = filterNodes(nodes, selector);
		}

		// return new collection
		return $(nodes);
	};
});
