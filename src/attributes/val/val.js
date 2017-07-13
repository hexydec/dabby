$.fn.val = function (value) {
	if (value === undefined) {
		if (this[0].multiple) {
			return $(this[0])
				.find("option")
				.filter(function () {
					return this.selected;
				})
				.map(function () {
					return this.value;
				});
		} else {
			return this[0].value;
		}
	} else {
		var i = this.length;
		while (i--) {
			if (this[i].multiple) {
				$(this[0])
					.find("option")
					.each(function () {
						this.selected = [].indexOf.call(value, this.value);
					});
			} else {
				this[i].value = value;
			}
		}
		return this;
	}
};