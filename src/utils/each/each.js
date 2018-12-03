import $ from "../../core/core.js";

$.each = (obj, callback) => {
	const isArr = Array.isArray(obj),
		keys = Object.keys(obj),
		len = keys.length;

	for (let i = 0; i < len; i++) {
		if (callback.call(obj[keys[i]], isArr ? parseInt(keys[i]) : keys[i], obj[keys[i]]) === false) {
			break; // stop if callback returns false
		}
	}
	return obj;
};
