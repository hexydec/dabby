$.fn.val = function (value) {

	function getValue(value) {
		if (!isNaN(value)) {
			if (value % 1 === 0) {
				return parseInt(value);
			} else {
				return parseFloat(value);
			}
		}
		return value;
	}

	// set value
	if (value !== undefined) {
		var i = this.length;
		while (i--) {
			if (this[i].multiple) {
				$(this[i])
					.find("option")
					.each(function () {
						var val = value instanceof Array ? value : [value];
						val = $.map(val, function (item) {return getValue(item);});
						this.selected = val.indexOf(getValue(this.value)) > -1;
					});
			} else {
				this[i].value = getValue(value);
			}
		}
		return this;

	// get multiple values
	} else if (this[0] && this[0].multiple) {
		var values = [];
		$("option", this[0])
			.each(function () {
				if (this.selected) {
					values.push(getValue(this.value));
				}
			});
		return values;

	// get single value
	} else if (this[0]) {
		return this[0].value;
	}
};
