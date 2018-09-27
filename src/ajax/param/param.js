import $ from "../../core/dabby/dabby.js";
import "../../utils/isarray/isarray.js";
import "../../utils/each/each.js";

$.param = obj => {
	let params = [],
		add = (key, value, params) => {
			let isArr = $.isArray(value);
			if (isArr || typeof value === "object") {
				$.each(value, (i, val) => {
					params = add(key + "[" + (isArr ? "" : i) + "]", val, params);
				});
			} else {
				params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
			}
			return params;
		};

	// process values
	$.each(obj, (key, item) => {
		params = add(key, item, params);
	});
	return params.join("&");
};
