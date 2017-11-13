$.fn.text = function (text) {
	var len = this.length,
		output = [],
		get = text === undefined,
		i = 0;
	for (; i < len; i++) {
		if (get) {
			output.push(this[i].textContent);
		} else {
			this[i].textContent = getVal(text, this[i], i);
		}
	}
	return get ? output.join(" ") : this;
};
