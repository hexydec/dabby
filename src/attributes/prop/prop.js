$.fn.prop = function (prop, value) {
	prop = prop.toLowerCase();

	// set
	if (value || value === "") {
		var i = this.length;
		while (i--) {
			this[i][prop] = value;
		}
		return this;
	} else if (this[0]) {
		return this[prop];
	}
};