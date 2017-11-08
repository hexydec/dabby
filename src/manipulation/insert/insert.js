$.each({
	before: "beforeBegin",
	prepend: "afterBegin",
	append: "beforeEnd",
	after: "afterEnd"
}, function (name, pos) {
	$.fn[name] = function (html) {
		var i,
			pre = ["before", "prepend"].indexOf(name) > -1,
			insert = $(html), // parse html into nodes
			backwards = insert.length,
			forwards = -1;

		while (pre ? backwards-- : ++forwards < backwards) { // insert forwards or backwards?
			i = this.length;
			while (i--) {
				this[i].insertAdjacentElement(pos, insert.get(pre ? backwards : forwards));
			}
		}
		return this;
	};
});

["Before", "After"].forEach(function (func) {
	$.fn["insert" + func] = function (target) {
		return $(target)[func.toLowerCase()](this);
	};
});
