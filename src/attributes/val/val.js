import $ from "../../core/core.js";
import getVal from "../../internal/getval/getval.js";
import "../../utils/map/map.js";
import "../../core/each/each.js";

$.fn.val = function (value) {

	// set value
	if (value !== undefined) {
		let i = this.length,
			values = getVal(this, value, obj => obj.val());

		while (i--) {

			// string value, just set to value attribute
			if (!Array.isArray(values[i])) {
				this[i].value = values[i];

			// array on select, set matching values to selected
			} else if (this[i].type === "select-multiple") {
				values[i] = values[i].map(val => String(val));
				$("option", this[i]).each((key, obj) => {
					obj.selected = values[i].indexOf(obj.value) > -1;
				});

			// set the checked attribute for radios and checkbox
			} else {
				this[i].checked = values[i].indexOf(this[i].value) > -1;
			}
		}
		return this;
	}

	// read value from first node
	if (this[0]) {

		// get multiple values
		if (this[0].type === "select-multiple") {
			let values = [];
			$("option", this[0]).each((key, obj) => {
				if (obj.selected) {
					values.push("" + obj.value);
				}
			});
			return values;
		}

		// get single value
		if (this[0].type !== "checkbox" || this[0].checked) {
			return "" + this[0].value;
		}
	}
};
