import $ from "../../core/core.js";
import "../../traversal/parents/parents.js";
import "../../traversal/filter/filter.js";
import "../../core/each/each.js";

$.fn.unwrap = function (selector) {
	this.parent(selector).not("body").each((key, obj) => {
		$(obj.children).each((i, node) => {
			obj.parentNode.insertBefore(node, obj);
		});
		obj.parentNode.removeChild(obj);
	});
	return this;
};
