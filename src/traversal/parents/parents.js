import $ from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

["parent", "parents", "parentsUntil"].forEach(func => {
	$.fn[func] = function (selector, filter) {
		const all = func.indexOf("s") > -1,
			until = func.indexOf("U") > -1;
		let nodes = [],
			i = this.length,
			parent;

		while (i--) {
			parent = this[i].parentNode;
			while (parent && parent.nodeType === Node.ELEMENT_NODE) {
				nodes.push(parent);
				if (!all || (until && filterNodes(parent, selector).length)) {
					break;
				} else {
					parent = parent.parentNode;
				}
			}
		}
		if (selector) {
			nodes = filterNodes(nodes, selector);
		}
		return $(nodes);
	}
});
