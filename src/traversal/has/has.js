import $ from "../../core/dabby/dabby.js";
import "../../core/get/get.js";

$.fn.has = function (selector) {
	return $(this.get().filter(node => !!$(selector, node).length));
};
