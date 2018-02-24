$.each({
	before: "beforeBegin",
	prepend: "afterBegin",
	append: "beforeEnd",
	after: "afterEnd"
}, (name, pos) => {
	$.fn[name] = function (html) {
		const pre = ["before", "prepend"].indexOf(name) > -1,
			isFunc = $.isFunction(html);
		let i = this.length,
			elems = $(),
			backwards, // for counting down
			forwards = -1, // for counting up
			obj;

		if (!isFunc) { // multiple arguments containing nodes?
			$.each(arguments, (i, arg) => {
				elems.add(arg);
			});
		}

		while (i--) {
			if (isFunc) {
				elems = $(getVal(html, this[i], i, this[i].innerHTML));
			}
			backwards = elems.length;
			while (pre ? backwards-- : ++forwards < backwards) { // insert forwards or backwards?
				obj = elems[pre ? backwards : forwards];

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
