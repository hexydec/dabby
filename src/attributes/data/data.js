$.fn.data = function (name, data) {
	let temp = {},
		i = this.length;

	// convert data to object
	if (typeof name === "object") {
		data = name;
	} else if (data !== undefined) {
		temp[name] = data;
		data = temp;
	}
	name = camelise(name);

	// set value
	if (data !== undefined) {
		while (i--) {
			$.each(data, (key, value) => {
				this[i].dataset[camelise(key)] = typeof value === "object" ? JSON.stringify(value) : value;
			});
		}
		return this;

	// get value
	} else if (this[0] && this[0].dataset[name]) {
		try {
			return JSON.parse(this[0].dataset[name]);
		} catch (e) {
			return this[0].dataset[name];
		}
	}
};
