export default <T extends Object>(obj: T) : ProxyHandler<T> => {
	return new Proxy(obj, {
		set(self, prop, value) : boolean {
			Object.defineProperty(self, prop, {
				value: value,
				writable: false
			});
			return true;
		}
	});
};
