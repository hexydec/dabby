$.fn.siblings = function (selector) {
	var i = this.length,
		nodes = [];

	while (i--) {
		this[i].parentNode.children.forEach(child => {
			if (!child.isSameNode(this[i])) {
				nodes.push(child);
			}
		});
	}
	return $(selector ? filterNodes(nodes, selector) : nodes);
};
