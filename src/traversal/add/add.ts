import $ from "../../core/dabby/dabby";
import { DabbyNode } from "../../core/dabby/types";
import "../../core/get/get";

$.fn.add = function (nodes: DabbyNode, context: DabbyNode) {
	nodes = $(nodes, context).get();
	return $(Array.from(this).concat(nodes));
};
