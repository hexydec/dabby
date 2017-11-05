$.fn.html = function (html) {

	// set
	if (html) {
		var i = this.length;
		while (i--) {
			this[i].innerHTML = html;
		}
		return this;

	// get
	} else if (this[0]) {
		return this[0].innerHTML;
	}
};