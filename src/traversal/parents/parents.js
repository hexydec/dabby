import $ from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

["parent", "parents", "parentsUntil"].forEach((func, f) => {
	const until = f > 1;

	Object.defineProperty($.fn, func, {
		value: function (selector, filter) {
			let nodes = [],
				i = this.length,
				parent;

			while (i--) {
				parent = this[i].parentNode;
				while (parent && parent.nodeType === 1) { // Node.ELEMENT_NODE
					if (until && filterNodes(parent, selector).length) {
						break;
					}
					nodes.push(parent);
					if (!f) {
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
});
