import $ from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

["next", "nextAll", "nextUntil", "prev", "prevAll", "prevUntil"].forEach((func, f) => {
	const all = f % 3 === 1,
		until = f % 3 > 1,
		method = (f < 3 ? "next" : "previous") + "ElementSibling";

	$.fn[func] = function (selector, filter) {
		let nodes = [],
			i = 0,
			len = this.length;

		// look through each node and get siblings
		for (; i < len; i++) {
			let sibling = this[i][method];
			while (sibling) {

				// end when we match until
				if (until && filterNodes(sibling, selector).length) {
					break;
				}

				// add the node
				nodes.push(sibling);

				// end when not finding all
				if (f % 3 === 0) {
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
