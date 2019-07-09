import $ from "../../core/core.js";
import "../insert/insert.js";

$.each({
	prependTo: "prepend",
	appendTo: "append",
	insertBefore: "before",
	insertAfter: "after"
}, (name, func) => {
	$.fn[name] = function (selector) {
		$(selector)[func](this);
		return this;
	};
});
