$.fn.empty = function () {
	var i = this.length;
	while (i--) {
		this[i].innerHTML = "";
	}
	return this;
};