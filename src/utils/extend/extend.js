$.extend = function (obj) {
	var arrs = arguments,
		i = 1,
		keys,
		k,
		len = arrs.length;

	for (; i < len; i++) {
		keys = Object.keys(arrs[i]);
		k = keys.length;
		while (k--) {
			obj[keys[k]] = arrs[i][keys[k]];
		}
	}
	return obj;
};
