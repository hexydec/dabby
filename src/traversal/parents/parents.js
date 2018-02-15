["parent", "parents", "parentsUntil"].forEach(func => {
	$.fn[func] = function (selector, filter) {
		const all = func.includes("s"),
			until = func.includes("U");
		let nodes = [],
			i = this.length,
			parent;

		while (i--) {
			parent = this[i].parentNode;
			while (parent) {
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
