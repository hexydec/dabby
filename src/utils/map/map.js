import $ from "../../core/core.js";
import "../each/each.js";

$.map = (obj, callback) => {
	let arr = [];
	$.each(obj, (i, item) => {
		const result = callback.call(window, item, i);
		if (result != null) { // double equals to capture undefined also
			arr = arr.concat(Array.isArray(result) ? result : [result]);
		}
	});
	return arr;
};
