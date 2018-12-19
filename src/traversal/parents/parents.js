import $ from "../../core/core.js";
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
				if (until && filterNodes(parent, selector).length) {
					break;
				}
				nodes.push(parent);
				if (!all) {
					break;
				}
				parent = parent.parentNode;
			}
		}
		if (!until) {
			filter = selector;
		}
		return $(filter ? filterNodes(nodes, filter) : nodes);
	}
});
