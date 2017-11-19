$.fn.data = function (name, data) {
	var temp = {},
		len,
		i,
		self = this;

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
		i = self.length;
		while (i--) {
			$.each(data, function (key, value) {
				self[i].dataset[camelise(key)] = typeof value === "object" ? JSON.stringify(value) : value;
			});
		}
		return self;

	// get value
	} else if (self[0] && self[0].dataset[name]) {
		try {
			return JSON.parse(self[0].dataset[name]);
		} catch (e) {
			return self[0].dataset[name];
		}
	}
};
