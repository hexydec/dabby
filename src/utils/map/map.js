import $ from "../../core/core.js";
import "../each/each.js";

$.map = (obj, callback) => {
	let arr = [];
	$.each(obj, (i, item) => {
		const result = callback.call(window, item, i);
		if (![null, undefined].indexOf(result) > -1) {
			arr.push(result);
		}
	});
	return arr;
};
