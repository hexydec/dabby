import $ from "../../core/core.js";

$.fn.has = function (selector) {
	return $(Array.from(this).filter(node => !!$(selector, node).length));
};
