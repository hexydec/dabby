$.fn.val = function (value) {

	function getValue(value) {
		if (value && !isNaN(value)) {
			value = value % 1 === 0 ? parseInt(value) : parseFloat(value);
		}
		return value;
	}

	// set value
	if (value !== undefined) {
		let i = this.length,
			val;
		while (i--) {
			if (this[i].multiple) {
				val = $.map(
					$.isArray(value) ? value : [value],
					item => getValue(item)
				);
				$("option", this[i]).each(function () {
					this.selected = val.includes(getValue(this.value));
				});
			} else {
				this[i].value = getValue(value);
			}
		}
		return this;

	// read value from first node
	} else if (this[0]) {

		// get multiple values
		if (this[0].multiple) {
			let values = [];
			$("option", this[0]).each(function () {
				if (this.selected) {
					values.push(getValue(this.value));
				}
			});
			return values;

		// get radio box value
		} else if (this[0].type === "radio") {
			let obj = this.filter("[name='" + this[0].name + "']:checked").get(0);
			return getValue(obj ? obj.value : undefined);

		// get single value
		} else if (this[0].type !== "checkbox" || this[0].checked) {
			return getValue(this[0].value);
		}
	}
};
