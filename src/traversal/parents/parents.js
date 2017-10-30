["parent", "parents", "parentsUntil"].forEach(function (func) {
	$.fn[func] = function (selector, filter) {
		var nodes = [],
			i = this.length,
			parent,
			all = func.indexOf("s") > -1,
			until = func.indexOf("U") > -1;

		while (i--) {
			parent = this[i].parentNode;
			while (parent) {
				nodes.push(parent);
				if (!all || (until && filterNodes(parent, selector))) {
					break;
				} else {
					parent = parent.parentNode;
				}
			}
		}
		if (selector) {
			nodes = filterNodes.call(nodes, selector);
		}
		return $(nodes);
	}
});
