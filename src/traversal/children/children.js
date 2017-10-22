$.fn.children = function (selector) {
	var nodes = [],
		slice = nodes.slice,
		i = this.length;

	while (i--) {
		nodes = nodes.concat(slice.call(this[i].children));
	}
	if (selector) {
		nodes = filterNodes.call(nodes, selector);
	}
	return $(nodes);
};
