$.map = function (obj, callback) {
	const keys = Object.keys(obj),
		len = keys.length;
	let arr = [],
		i = 0,
		result;

	for (; i < len; i++) {
		result = callback.call(window, obj[keys[i]], keys[i])
		if (![null, undefined].includes(result)) {
			arr.push(result);
		}
	}
	return arr;
};
