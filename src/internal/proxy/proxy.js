/**
 * Creates a new Proxy for the target object.
 *
 * @param {Object} obj - The object the Proxy will wrap.
 * @returns {Proxy} A Proxy for the target.
 */

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
