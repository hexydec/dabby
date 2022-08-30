import $ from "../../core/core";
import { DabbyNode, DabbyObject, Selector } from "../../core/dabby/types";
import "../../core/get/get";
import isFunction from "../../internal/isfunction/isfunction";

export default (nodes: Element|Element[], filter: Selector, context?: Selector, not: boolean = false) => {

	// normalise to array
	if (nodes instanceof Node) {
		nodes = [nodes];
	}

	// sort out args
	if (typeof context === "boolean") {
		not = context;
		context = null;
	}

	// custom filter function
	let func: Function;
	if (isFunction(filter)) {
		func = filter;

	// nodes
	} else {

		// normalise filters
		const match: Element[]|String[] = typeof filter === "string" ? [filter] : $(filter, context).get();

		// default filter function
		const func = (_n: number, node: Element) => {
			let i = match.length;
			while (i--) {
				if (typeof match[i] === "string" ? node.matches((match[i] as string)) : node === match[i]) {
					return true;
				}
			}
			return false;
		};
	}
	return nodes.filter((item, i) => func.call(item, i, item) === !not, nodes);
}
