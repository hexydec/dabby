$.fn.parents = function (selector) {
	var nodes = [],
		i = this.length,
		node;

	while (i--) {
		node = this[i];
		while (node.parentNode) {
			if (!selector || node.parentNode.matches(selector)) {
				nodes.push(node.parentNode);
			}
			node = node.parentNode;
		}
	}
	return $(nodes);
};