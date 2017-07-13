$.extend = function (obj) {
	var arrs = arguments,
		i = 1,
		keys,
		k,
		len = arguments.length;
	for (; i < len; i += 1) {
		keys = Object.keys(arrs[i]);
		k = keys.length;
		while (k--) {
			obj[keys[k]] = arrs[i][keys[k]];
		}
	}
	return obj;
};