import $ from "../../core/core.js";
import getVal from "../../internal/getval/getval.js";
import "../../utils/isarray/isarray.js";
import "../../utils/map/map.js";
import "../../core/each/each.js";
import "../../traversal/filter/filter.js";

$.fn.val = function (value) {

	// set value
	if (value !== undefined) {
		let i = this.length,
			values = getVal(this, value, obj => obj.val());

		while (i--) {

			// multi-select control
			if (this[i].multiple) {
				values[i] = $.map($.isArray(values[i]) ? values[i] : [values[i]], item => String(item)); // convert to string
				$("option", this[i]).each((key, obj) => {
					obj.selected = values[i].indexOf(String(obj.value)) > -1;
				});

			// any other form control
			} else if (this[i].type !== "radio") {
				this[i].value = String(values[i]);

			// radio control
			} else if (String(this[i].value) === String(values[i])) {
				this[i].checked = true;
			}
		}
		return this;

	// read value from first node
	} else if (this[0]) {

		// get multiple values
		if (this[0].multiple) {
			let values = [];
			$("option", this[0]).each((key, obj) => {
				if (obj.selected) {
					values.push(String(obj.value));
				}
			});
			return values;

		// get single value
		} else if (this[0].type !== "checkbox" || this[0].checked) {
			return String(this[0].value);
		}
	}
};
