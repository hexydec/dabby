import $ from '../../core/core.js';
$.each = (obj, callback) => {
	const isArr = Array.isArray(obj) || obj.length !== undefined, keys = isArr ? 0 : Object.keys(obj), // only get keys if object
	len = isArr ? obj.length : keys;
	if (keys) {
		for (let i = 0, key; i < len; i++) {
			key = isArr ? i : keys[i]; // get index or key
			if (callback.call(obj[key], key, obj[key]) ===
				false) {
				break; // stop if callback returns false
			}
		}
	}
	return obj;
};
//# sourceMappingURL=each.js.map