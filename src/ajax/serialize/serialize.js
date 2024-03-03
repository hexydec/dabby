import $, {Dabby} from "../../core/dabby/dabby.js";
import "../../traversal/filter/filter.js";
import "../../core/each/each.js";
import "../../attributes/val/val.js";
import "../param/param.js";

/**
 * Serializes the values of the form controls contained within the collection as a querystring
 * 
 * @returns string The values of the collection of form controls as a querystring
 */
const serialize = function () {
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
				if (!Array.isArray(params)) {
					params = [];
				}
				params = params.concat(Array.isArray(value) ? value : [value]);
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

Object.defineProperty(Dabby.prototype, "serialize", {value: serialize});