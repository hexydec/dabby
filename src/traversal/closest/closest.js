$.fn.closest = function (selector) {
	let i = this.length,
		nodes = [],
		parents,
		node;

	while (i--) {
		parents = [];
		node = this[i];
		while (node) {
			parents.push(node);
			node = node.parentNode;
		}
		parents = filterNodes(parents, selector);
		if (parents[0]) {
			nodes.push(parents[0]);
		}
	}
	return $(nodes);
};
