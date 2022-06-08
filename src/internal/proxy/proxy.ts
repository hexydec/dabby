export default (obj: Object) => {
	return new Proxy(obj, {
		set: function (self, prop, value) {
			Object.defineProperty(self, prop, {
				value: value,
				writable: false
			});
			return true;
		}
	});
};
