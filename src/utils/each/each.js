$.each = function (obj, callback) {
	var keys = Object.keys(obj),
		i = 0,
		len = keys.length;

	for (; i < len; i++) {
		if (callback.call(obj[keys[i]], keys[i], obj[keys[i]]) === false) {
			break; // stop if callback returns false
		}
	}
	return obj;
};
