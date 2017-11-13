$.fn.wrap = function (html) {
	var i = this.length,
		isFunc = $.isFunction(html);
	while (i--) {
		$(this[i]).wrapAll(isFunc ? html.call(this[0], i) : html);
	}
	return this;
}
