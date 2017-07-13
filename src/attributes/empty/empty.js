$.fn.empty = function (html) {
	var i = this.length;
	while (i--) {
		this[i].innerHTML = "";
	}
	return this;
};