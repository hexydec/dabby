$.fn.empty = function () {
	let i = this.length;
	while (i--) {
		this[i].innerHTML = "";
	}
	return this;
};
