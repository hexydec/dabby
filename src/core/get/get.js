$.fn.get = function (i) {
	return i === undefined ? [].slice.call(this) : this[i >= 0 ? i : i + this.length];
};
