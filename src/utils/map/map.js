import $ from "../../core/core.js";

$.map = (obj, callback) => {
	const keys = Object.keys(obj),
		len = keys.length,
		arr = [];

	for (let i = 0; i < len; i++) {
		const result = callback.call(window, obj[keys[i]], keys[i]);
		if (result != null) { // double equals to capture undefined also
			arr.push(result);
		}
	}
	return arr;
};
