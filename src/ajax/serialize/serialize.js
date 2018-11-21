import $ from "../../core/core.js";
import "../../traversal/filter/filter.js";
import "../../utils/isarray/isarray.js";
import "../../core/each/each.js";
import "../../attributes/val/val.js";
import "../param/param.js";

$.fn.serialize = function () {
	const selector = "input[name]:not([type=file]):not([type=submit]):not([type=radio]):not([type=checkbox]),input[name]:checked,textarea[name],select[name]",
		add = (name, value, params) => {
			let match;

			if ((match = name.match(/([^\[]*)\[([^\]]*)\](.*)/)) !== null) {
				name = match[1];
				let arr = add(match[2] + match[3], value, params[name] || {});
				value = arr;
			}

			if (name !== "") {
				params[name] = value;
			} else {
				if (!$.isArray(params)) {
					params = [];
				}
				params = params.concat($.isArray(value) ? value : [value]);
			}
			return params;
		};
	let obj = this.filter(selector);

	if (!obj.length) {
		obj = $(selector, this);
	}

	let params = {};

	// process values
	obj.each((key, obj) => {
		const value = $(obj).val();
		if (!obj.disabled && value !== undefined) {
			params = add(obj.name, value, params);
		}
	});
	return $.param(params);
};
