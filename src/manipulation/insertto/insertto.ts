import $ from "../../core/dabby/dabby";
import "../insert/insert.js";
import "../../utils/each/each.js";

$.each({
	prependTo: "prepend",
	appendTo: "append",
	insertBefore: "before",
	insertAfter: "after"
}, (name: string | number, func: string | number) => {
	$.fn[name] = function (selector: any) {
		$(selector)[func](this);
		return this;
	};
});
