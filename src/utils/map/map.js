$.map = (obj, callback) => {
	const keys = Object.keys(obj),
		len = keys.length;
	let arr = [],
		i = 0,
		result;

	for (; i < len; i++) {
		result = callback.call(window, obj[keys[i]], keys[i])
		if (![null, undefined].indexOf(result) > -1) {
			arr.push(result);
		}
	}
	return arr;
};
