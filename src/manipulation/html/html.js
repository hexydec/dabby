$.fn.html = function (html) {

	// set
	if (html !== undefined) {
		let i = this.length;
		while (i--) {
			this[i].innerHTML = getVal(html, this[i], i);
		}
		return this;

	// get
	} else if (this[0]) {
		return this[0].innerHTML;
	}
};
