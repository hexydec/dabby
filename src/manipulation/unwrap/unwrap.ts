import $ from "../../core/core.js";
import "../../traversal/parents/parents.js";
import "../../traversal/filter/filter.js";
import "../../core/each/each.js";

$.fn.unwrap = function (selector: any) {
	this.parent(selector).not("body").each((_key: any, obj: { children: any; parentNode: { insertBefore: (arg0: any, arg1: any) => void; removeChild: (arg0: any) => void; }; }) => {
		$(obj.children).each((_i: any, node: any) => {
			obj.parentNode.insertBefore(node, obj);
		});
		obj.parentNode.removeChild(obj);
	});
	return this;
};
