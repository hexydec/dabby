export default (obj, writable = [], indexes = false) => {
	return new Proxy(obj, {
		set: function (self, prop, value) {
			if (!writable.includes(prop) && (!indexes || parseInt(prop).toString() !== prop)) {
				return Object.defineProperty(self, prop, {
					value: value,
					enumerable: indexes,
					writable: false
				});
			} else {
				self[prop] = value;
				return true;
			}
		}
	});
};
