import $, {Dabby} from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

const factory = (obj, selector, filter, single, until) => {
	let nodes = [],
		i = obj.length,
		parent;

	while (i--) {
		parent = obj[i].parentNode;
		while (parent && parent.nodeType === 1) { // Node.ELEMENT_NODE
			if (until && filterNodes(parent, selector).length) {
				break;
			}
			nodes.push(parent);
			if (single) {
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

Object.defineProperty(Dabby.prototype, "parent", {
	value: function (selector, filter) {
		return factory(this, selector, filter, true);
	}
});

Object.defineProperty(Dabby.prototype, "parents", {
	value: function (selector, filter) {
		return factory(this, selector, filter);
	}
});

Object.defineProperty(Dabby.prototype, "parentsUntil", {
	value: function (selector, filter) {
		return factory(this, selector, filter, true, true);
	}
});