$.fn.map = function (callback) {
	var nodes = [],
		len = this.length,
		i = 0;

	for (; i < len; i++) {
		nodes.push(callback.call(this[0], i, this[0]));
	}
	return $(nodes);
};
