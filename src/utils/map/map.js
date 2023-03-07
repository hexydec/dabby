import $ from "../../core/dabby/dabby.js";

$.map = (obj, callback) => {
	let keys = Object.keys(obj),
		len = keys.length,
		arr = [],
		i = 0;

	for (; i < len; i++) {
		const result = callback.call(window, obj[keys[i]], keys[i]);
		if (result != null) { // double equals to capture undefined also
			arr = arr.concat(Array.isArray(result) ? result : [result]);
		}
	}
	return arr;
};
