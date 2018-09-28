import $ from "../../core/core.js";
import "../../utils/each/each.js";

$.each({
	insertBefore: "before",
	prependTo: "prepend",
	appendTo: "append",
	insertAfter: "after"
}, (name, func) => {
	$.fn[name] = function (selector) {
		let i = this.length,
			obj = $(selector);

		while (i--) {
			obj[func](this[i]);
		}
		return this;
	};
});
