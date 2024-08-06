import $ from "../../core/dabby/dabby.js";
import "../../utils/each/each.js";

Object.defineProperty($, "param", {value: obj => {
	let params = [],
		add = (key, value, params) => {
			let isArr = Array.isArray(value);
			if (isArr || typeof value === "object") {
				$.each(value, (i, val) => {
					params = add(`${key}[${isArr ? "" : i}]`, val, params);
				});
			} else {
				if (typeof value === "function") {
					value = value();
				}
				params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value === null ? "" : value));
			}
			return params;
		};

	// process values
	$.each(obj, (key, item) => {
		params = add(key, item, params);
	});
	return params.join("&");
}});