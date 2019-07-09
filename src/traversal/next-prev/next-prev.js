import $ from "../../core/core.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

["next", "nextAll", "nextUntil", "prev", "prevAll", "prevUntil"].forEach(func => {
	const next = func.indexOf("x") > -1,
		all = func.indexOf("A") > -1,
		until = func.indexOf("U") > -1,
		method = next ? "nextElementSibling" : "previousElementSibling";

	$.fn[func] = function (selector, filter) {
		let nodes = [];

		// look through each node and get siblings
		for (let i = 0, len = this.length; i < len; i++) {
			let sibling = this[i][method];
			while (sibling) {

				// end when we match until
				if (until && filterNodes(sibling, selector).length) {
					break;
				}

				// add the node
				nodes.push(sibling);

				// end when not finding all
				if (!all && !until) {
					break;
				}
				sibling = sibling[method];
			}
		}

		// swap args for *Until methods
		if (until) {
			selector = filter;
		}

		// return new collection
		return $(selector ? filterNodes(nodes, selector) : nodes);
	};
});
