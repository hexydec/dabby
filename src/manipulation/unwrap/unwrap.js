import $ from "../../core/core.js";
import "../../traversal/parents/parents.js";
import "../../traversal/filter/filter.js";
import "../../core/each/each.js";

$.fn.unwrap = function (selector) {
	this.parent(selector).not("body").each((key, obj) => {
		const parent = obj.parentNode;

		$(obj.children).each((i, node) => {
			parent.insertBefore(node, obj);
		});
		parent.removeChild(obj);
	});
	return this;
};
