$.each = function (obj, callback) {
	var keys = Object.keys(obj),
		i = 0,
		len = keys.length;
	for (; i < len; i += 1) {
		if (callback.call(obj[keys[i]], keys[i], obj[keys[i]]) === false) {
			break;
		}
	}
	return obj;
};

$.fn.each = function (callback) {
	$.each(this.get(), callback);
	return this;
};