$.fn.add = function (nodes, context) {
	nodes = $(nodes, context);
	let len = this.length,
		i = nodes.length;

	this.length += i;
	while (i--) {
		this[i + len] = nodes[i];
	}
	return this;
};
