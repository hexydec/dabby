$.each({
	before: "beforeBegin",
	prepend: "afterBegin",
	append: "beforeEnd",
	after: "afterEnd"
}, function (name, pos) {
	$.fn[name] = function (html) {
		var i = this.length,
			pre = ["before", "prepend"].indexOf(name),
			insert = $(html),
			len = insert.length,
			n = 0;

		while (i--) {
			while (pre ? len-- : n++ < len) {
				this[i].insertAdjacentElement(pos, insert.get(pre ? len : n));
			}
		}
		return this;
	};
});
