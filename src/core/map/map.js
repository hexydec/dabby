$.fn.map = function (callback) {
	const len = this.length;
	let nodes = [],
		i = 0;

	for (; i < len; i++) {
		nodes.push(callback.call(this[0], i, this[0]));
	}
	return $(nodes);
};
