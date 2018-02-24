$.fn.val = function (value) {

	// set value
	if (value !== undefined) {
		let i = this.length,
			val;
		while (i--) {
			if (this[i].multiple) {
				val = $.map(
					$.isArray(value) ? value : [value],
					item => String(item)
				);
				$("option", this[i]).each((key, obj) => {
					obj.selected = val.indexOf(String(obj.value)) > -1;
				});
			} else {
				this[i].value = String(value);
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

		// get radio box value
		} else if (this[0].type === "radio") {
			let obj = this.filter("[name='" + this[0].name + "']:checked")[0];
			return obj ? String(obj.value) : undefined;

		// get single value
		} else if (this[0].type !== "checkbox" || this[0].checked) {
			return String(this[0].value);
		}
	}
};
