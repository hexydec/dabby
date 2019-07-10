import $ from "../../core/core.js";
import "../../utils/isfunction/isfunction.js";
import "../../traversal/add/add.js";
import getVal from "../../internal/getval/getval.js";

$.each({
	before: "beforeBegin",
	prepend: "afterBegin",
	append: "beforeEnd",
	after: "afterEnd"
}, (name, pos) => {

	// function tracking variables
	const pre = ["prepend", "after"].indexOf(name) > -1;

	// the function
	$.fn[name] = function (...content) {
		let elems,
			i = this.length,
			len = i;

		// retireve nodes from function
		if ($.isFunction(content[0])) {
			elems = $(getVal(this, content[0], obj => obj.innerHTML));

		// multiple arguments containing nodes
		} else {
			elems = content.reduce((dabby, item) => dabby.add(item), $());
		}

		// insert objects onto each element in collection
		while (i--) {
			let backwards = elems.length, // for counting down
				forwards = -1; // for counting up
			while (pre ? backwards-- : ++forwards < backwards) { // insert forwards or backwards?
				this[i].insertAdjacentElement(pos, i === len-1 ? elems[pre ? backwards : forwards] : elems[pre ? backwards : forwards].cloneNode(true));
			}
		}
		return this;
	};
});
