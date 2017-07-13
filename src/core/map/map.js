$.map = function (obj, callback) {
	var arr = [],
		keys = Object.keys(obj),
		len = keys.length;
	for (var i = 0; i < len; i += 1) {
		arr.push(callback(obj[keys[i]], keys[i]));
	}
	return arr;
};

$.fn.map = function (callback) {
	var nodes = [],
		len = this.length;
	for (var i = 0; i < len; i += 1) {
		nodes.push(callback.call(this[0], i, this[0]));
	}
	return $(nodes);
};