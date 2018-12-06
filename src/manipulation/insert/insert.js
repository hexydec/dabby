import $ from "../../core/core.js";
import "../../utils/each/each.js";
import "../../utils/isfunction/isfunction.js";
import "../../traversal/add/add.js";
import "../clone/clone.js";
import getVal from "../../internal/getval/getval.js";

$.each({
	before: "beforeBegin",
	prepend: "afterBegin",
	append: "beforeEnd",
	after: "afterEnd"
}, (name, pos) => {
	$.fn[name] = function (html) {
		let pre = ["before", "prepend"].indexOf(name) > -1,
			arr = [],
			i = this.length;

		if ($.isFunction(html)) {
			arr = getVal(this, html, obj => obj.innerHTML);

		// multiple arguments containing nodes
		} else {
			const elems = $();
			$.each(arguments, (i, arg) => elems.add(arg));
			while (i--) {
				arr[i] = i ? elems.clone() : elems;
			}
		}

		i = this.length;
		while (i--) {
			let backwards = arr[i].length, // for counting down
				forwards = -1; // for counting up
			while (pre ? backwards-- : ++forwards < backwards) { // insert forwards or backwards?
				this[i].insertAdjacentElement(pos, arr[i][pre ? backwards : forwards]);
			}
		}
		return this;
	};
});
