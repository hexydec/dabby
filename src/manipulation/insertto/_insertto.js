import $ from "../../core/dabby/dabby";
import "../insert/insert.js";
import "../../utils/each/each.js";

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
