$.extend = (...arrs) => {
	return Object.assign.apply(null, arrs);
	/*const len = arrs.length;
	let i = 0,
		keys,
		k;

	for (; i < len; i++) {
		keys = Object.keys(arrs[i]);
		k = keys.length;
		while (k--) {
			obj[keys[k]] = arrs[i][keys[k]];
		}
	}
	return obj;*/
};
