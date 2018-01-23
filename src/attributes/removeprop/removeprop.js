$.fn.removeProp = function (prop) {
	let i = this.length;
	prop = getProp(prop);

	while (i--) {
		delete this[i][prop];
	}
	return this;
};
