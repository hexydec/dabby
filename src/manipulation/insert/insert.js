import $ from "../../core/dabby/dabby.js";
import isFunction from "../../internal/isfunction/isfunction.js";
import "../../traversal/add/add.js";
import "../../utils/each/each.js";
import "../../manipulation/clone/clone.js";
import getVal from "../../internal/getval/getval.js";

$.each({
	before: "beforeBegin",
	prepend: "afterBegin",
	append: "beforeEnd",
	after: "afterEnd"
}, (name, pos) => {

	// function tracking variables
	const pre = ["prepend", "after"].includes(name);

	// the function
	Object.defineProperty($.fn, name, {
		value: function (...content) {
			let elems,
				i = this.length,
				len = i,
				isFunc = isFunction(content[0]);

			// multiple arguments containing nodes
			if (!isFunc) {
				elems = content.reduce((dabby, item) => dabby.add(item), $());
			}

			// insert objects onto each element in collection
			while (i--) {

				// retrieve nodes from function
				if (isFunc) {
					elems = getVal([this[i]], content[0], obj => obj.innerHTML).reduce((dabby, item) => dabby.add(item), $()); // getVal() returns an array so the items need merging into a collection
				}

				// insert nodes
				let backwards = elems.length, // for counting down
					forwards = -1; // for counting up
				while (pre ? backwards-- : ++forwards < backwards) { // insert forwards or backwards?
					this[i].insertAdjacentElement(pos, i === len-1 ? elems[pre ? backwards : forwards] : elems.eq(pre ? backwards : forwards).clone(true)[0]);
				}
			}
			return this;
		}
	});
});
