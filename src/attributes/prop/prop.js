$.fn.prop = function (prop, value) {
	prop = prop.toLowerCase();

	// set
	if (value !== undefined) {
		var i = this.length;
		while (i--) {
			this[i][prop] = value;
		}
		return this;

	// get
	} else if (this[0]) {
		return this[0][prop];
	}
};
