import $ from "../../core/core.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

["parent", "parents", "parentsUntil"].forEach(func => {
	const all = func.indexOf("s") > -1,
		until = func.indexOf("U") > -1;

	$.fn[func] = function (selector, filter) {
		let nodes = [],
			i = this.length;

		while (i--) {
			let parent = this[i].parentNode;
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
