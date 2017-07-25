$.fn.data = function (name, data) {
	name = camelise(name);
	if (data) {
		if (typeof data === "object") {
			data = JSON.stringify(data);
		}
		var i = this.length;
		while (i--) {
			this[i].dataset[name] = data;
		}
		return this;
	} else if (this[0] && this[0].dataset[name]) {
		try {
			return JSON.parse(this[0].dataset[name]);
		} catch (e) {
			return this[0].dataset[name];
		}
	}
};