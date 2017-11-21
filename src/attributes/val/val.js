$.fn.val = function (value) {

	function getValue(value) {
		if (!isNaN(value)) {
			value = value % 1 === 0 ? parseInt(value) : parseFloat(value);
		}
		return value;
	}

	// set value
	if (value !== undefined) {
		var i = this.length;
		while (i--) {
			if (this[i].multiple) {
				var val = $.map(
					$.isArray(value) ? value : [value],
					function (item) {return getValue(item);}
				);
				$("option", this[i]).each(function () {
					this.selected = val.indexOf(getValue(this.value)) > -1;
				});
			} else {
				this[i].value = getValue(value);
			}
		}
		return this;

	// get multiple values
	} else if (this[0]) {
		if (this[0].multiple) {
			var values = [];
			$("option", this[0]).each(function () {
				if (this.selected) {
					values.push(getValue(this.value));
				}
			});
			return values;

		// get radio box value
		} else if (this[0].type === "radio") {
			return getValue(this.filter("[name='" + this[0].name + "']:checked").get(0).value || undefined);

		// get single value
		} else if (this[0].type !== "checkbox" || this[0].checked) {
			return getValue(this[0].value);
		}
	}
};
