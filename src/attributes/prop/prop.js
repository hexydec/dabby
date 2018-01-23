$.fn.prop = function (prop, value) {
	prop = getProp(prop);

	// set
	if (value !== undefined) {
		let i = this.length;
		while (i--) {
			this[i][prop] = value;
		}
		return this;

	// get
	} else if (this[0]) {
		return this[0][prop];
	}
};
