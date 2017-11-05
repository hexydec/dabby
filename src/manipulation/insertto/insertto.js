["prepend", "append"].forEach(function (item, key) {
	$.fn[item + "To"] = function (selector) {
		var i = this.length,
			obj = $(selector);

		while (i--) {
			obj[item](this[i]);
		}
		return this;
	};
});
