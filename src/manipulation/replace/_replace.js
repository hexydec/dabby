import $ from "../../core/core.js";
import isFunction from "../../internal/isfunction/isfunction.js";
import getVal from "../../internal/getval/getval.js";
import "../../manipulation/clone/clone.js";

["replaceWith", "replaceAll"].forEach((func, f) => {
	$.fn[func] = function (html) {
		let source = f ? $(html) : this,
			target = f ? this : html,
			isFunc = isFunction(target),
			i = source.length;

		if (!isFunc) {
			target = $(target);
		}

		while (i--) {
			let n = target.length,
				parent = source[i].parentNode;
			while (n--) {
				const replace = isFunc ? getVal(target[n], n, target[n]) : target[n];
				if (n) {
					source[i].insertAdjacentElement("beforebegin", $(replace).clone(true).get(0));
				} else {
					source[i] = parent.replaceChild(i ? $(replace).clone(true).get(0) : replace, source[i]);
				}
			}
		}
		return this;
	};
});
