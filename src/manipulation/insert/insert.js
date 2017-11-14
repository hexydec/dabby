$.each({
	before: "beforeBegin",
	prepend: "afterBegin",
	append: "beforeEnd",
	after: "afterEnd"
}, function (name, pos) {
	$.fn[name] = function (html) {
		var i = this.length,
			pre = ["before", "prepend"].indexOf(name) > -1,
			backwards, // for counting down
			forwards = -1, // for counting up
			elems = $(),
			isFunc = $.isFunction(html),
			obj;

		if (!isFunc) {
			$.each(arguments, function (i, arg) {
				elems.add(arg);
			});
		}

		while (i--) {
			if (isFunc) {
				elems = $(getVal(html, this[i], i));
			}
			backwards = elems.length;
			while (pre ? backwards-- : ++forwards < backwards) { // insert forwards or backwards?
				obj = elems.get(pre ? backwards : forwards);

				// clone if i !== 0
				if (i) {
					obj = obj.cloneNode(true);
				}
				this[i].insertAdjacentElement(pos, obj);
			}
		}
		return this;
	};
});
