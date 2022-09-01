import $ from "../../core/dabby/dabby";
import "../../core/get/get.js";

$.fn.add = function (nodes, context) {
	nodes = $(nodes, context).get();
	return $(Array.from(this).concat(nodes));
};
