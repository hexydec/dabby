import $ from "../../core/dabby/dabby";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import "../../utils/each/each.js";
import getProp from "../../internal/getprop/getprop.js";
import getVal from "../../internal/getval/getval.js";

$.fn.prop = function (prop, value) {
	const isObj = isPlainObject(prop);

	// set
	if (value !== undefined || isObj) {

		// only work if there are nodes to work on
		if (this[0]) {

			// normalise values
			if (!isObj) {
				const tmp = {};
				tmp[prop] = value;
				prop = tmp;
			}

			// set properties
			$.each(prop, (key, val) => {
				key = getProp(key);
				val = getVal(this, val, obj => obj[key]);
				let i = this.length;
				while (i--) {
					this[i][key] = val[i];
				}
			});
		}
		return this;
	}

	// get
	if (this[0]) {
		return this[0][getProp(prop)];
	}
};
