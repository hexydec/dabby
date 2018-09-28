import $ from "../../core/core.js";
import "../../utils/each/each.js";
import "../../utils/isfunction/isfunction.js";
import "../../traversal/add/add.js";
import getVal from "../../internal/getval/getval.js";

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
			elems = $();

		if (!isFunc) { // multiple arguments containing nodes?
			$.each(arguments, (i, arg) => {
				elems.add(arg);
			});
		}

		while (i--) {
			if (isFunc) {
				elems = $(getVal(html, this[i], i, this[i].innerHTML));
			}
			let backwards = elems.length, // for counting down
				forwards = -1; // for counting up
			while (pre ? backwards-- : ++forwards < backwards) { // insert forwards or backwards?
				let obj = elems[pre ? backwards : forwards];

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
