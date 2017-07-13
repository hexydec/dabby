$.fn.add = function (nodes) {
	nodes = $(nodes);
	var len = this.length,
		i = nodes.length;

	while (i--) {
		this[i + len] = nodes[i];
	}
	return this;
};