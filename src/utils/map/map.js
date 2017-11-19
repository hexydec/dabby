$.map = function (obj, callback) {
	var arr = [],
		keys = Object.keys(obj),
		len = keys.length,
		i = 0,
		result;

	for (; i < len; i++) {
		if ((result = callback(obj[keys[i]], keys[i])) !== null) {
			arr.push(result);
		}
	}
	return arr;
};
