import $ from "../../core/dabby/dabby.js";
import "../insert/insert.js";
import "../../utils/each/each.js";

$.each({
	prependTo: "prepend",
	appendTo: "append",
	insertBefore: "before",
	insertAfter: "after"
}, (name, func) => {
	Object.defineProperty($.fn, name, {
		value: function (selector) {
			$(selector)[func](this);
			return this;
		}
	});
});
