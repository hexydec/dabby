$.fn.clone = function () {
	var nodes = [],
		i = this.length;

	while (i--) {
		nodes[i] = this[i].cloneNode(true);
	}
	return $(nodes);
};