$.fn.children = function (selector) {
	let nodes = [],
		i = this.length;

	while (i--) {
		nodes = nodes.concat(Array.from(this[i].children));
	}

	// filter nodes by selector
	if (selector) {
		nodes = filterNodes(nodes, selector);
	}
	return $(nodes);
};
