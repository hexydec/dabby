$.each({
	before: "beforeBegin",
	prepend: "afterBegin",
	append: "beforeEnd",
	after: "afterEnd"
}, function (name, pos) {
	$.fn[name] = function (html) {
		for (var i = 0; i < this.length; i += 1) {
			if (typeof html === "string") {
				this[i].insertAdjacentHTML(pos, html);
			} else {
				$(html).each(function () {
					this[i].insertAdjacentElement(pos, this);
				});
			}
		}
		return this;
	};
});
