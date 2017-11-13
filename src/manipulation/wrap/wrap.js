$.fn.wrap = function (html) {
	var i = this.length;
	while (i--) {
		$(this[i]).wrapAll(getVal(html, this[i], i));
	}
	return this;
}
