$.fn.siblings = function (selector) {
	var i = this.length,
		nodes = [],
		node;

	while (i--) {
		node = this[i];
		nodes = nodes.concat(Array.from(node.parentNode.children).filter(function (child) {
			return !child.isSameNode(node);
		}));
	}
	return $(selector ? filterNodes(nodes, selector) : nodes);
};
