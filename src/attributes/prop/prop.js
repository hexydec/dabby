import $ from "../../core/core.js";
import "../../utils/isplainobject/isplainobject.js";
import getProp from "../../internal/getprop/getprop.js";
import getVal from "../../internal/getval/getval.js";

$.fn.prop = function (prop, value) {
	const isObj = $.isPlainObject(prop);

	// set
	if (value !== undefined || isObj) {

		// normalise values
		if (!isObj) {
			const tmp = {};
			tmp[prop] = value;
			prop = tmp;
		}

		// retrieve values
		let values = [];
		$.each(prop, (key, val) => {
			values[getProp(key)] = getVal(this, val, obj => obj[key]);
		});

		// set properties
		$.each(values, (key, val) => {
			let i = this.length;
			while (i--) {
				this[i][key] = val[i];
			}
		});
		return this;

	// get
	} else if (this[0]) {
		return this[0][getProp(prop)];
	}
};
