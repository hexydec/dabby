import $ from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";
import "../../utils/map/map.js";
import "../../core/each/each.js";

Object.defineProperty($.fn, "val", {
	value: function (value) {

		// set value
		if (value !== undefined) {
			let i = this.length,
				values = getVal(this, value, obj => $(obj).val());

			while (i--) {
				const isArr = Array.isArray(values[i]);

				// array on select, set matching values to selected
				if (this[i].type.includes("select")) {
					values[i] = (isArr ? values[i] : [values[i]]).map(val => "" + val);
					$("option", this[i]).each((key, obj) => {
						obj.selected = values[i].includes(obj.value || obj.text);
					});

				// set the checked attribute for radios and checkbox
				} else if (isArr) {
					this[i].checked = values[i].includes(this[i].value);

				// string value, just set to value attribute
				} else {
					this[i].value = values[i];
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
	}
});
