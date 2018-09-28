import $ from "../../core/core.js";

$.fn.map = function (callback) {
	const len = this.length;
	let values = [],
		i = 0;

	for (; i < len; i++) {
		values.push(callback.call(this[i], i, this[i]));
	}
	return values;
};
