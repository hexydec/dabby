$.fn.data = function (name, data) {
	if (data) {
		var i = this.length;
		while (i--) {
			this[i].dataset[name] = data;
		}
		return this;
	} else if (this[0] && this[0].dataset[name]) {
		return JSON.parse(this[0].dataset[name]) || this[0].dataset[name];
	}
};