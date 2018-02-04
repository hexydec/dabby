$.fn.closest = function (selector, context) {
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
		parents = filterNodes(parents, selector, context);
		if (parents[0]) {
			nodes.push(parents[0]);
		}
	}
	return $(nodes);
};
