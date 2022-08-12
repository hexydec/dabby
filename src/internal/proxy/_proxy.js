export default obj => {
	return new Proxy(obj, {
		set: function (self, prop, value) {
			return Object.defineProperty(self, prop, {
				value: value,
				writable: false
			});
		}
	});
};
