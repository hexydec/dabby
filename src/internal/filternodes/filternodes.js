import $ from "../../core/dabby/dabby.js";
import "../../core/get/get.js";

/**
* Filters nodes in a dabby collection by the specified filters
* @function filternodes
* @param {dabby} dabby The dabby collection to filter
* @param {(filterCallback|selector)} filter A string specifying a CSS selector to match against the items in the collection, a selector specifying the nodes to filter the collection by, or a callback function to do custom filtering
* @param {(selector|boolean)} context A selector to use as the context to a `filter` when specified as a selector (except a string), or a boolean to specify `not` (shorthand)
* @param {boolean} not Inverses the filtering process to produce all the nodes that do not match the input `filter`
* @returns {dabby} A new dabby collection containing the filtered nodes
*/

export default (dabby, filter, context, not) => {
	let func,
		nodes = dabby.nodeType ? [dabby] : Array.from(dabby);

	// sort out args
	if (typeof context === "boolean") {
		not = context;
		context = null;
	}

	// custom filter function
	if (typeof filter === "function") {
		func = filter;

	// nodes
	} else {

		// normalise filters
		filter = typeof filter === "string" ? [filter] : $(filter, context).get();

		// default filter function
		func = (n, node) => {
			let i = filter.length;
			while (i--) {
				if (typeof filter[i] === "string" ? node.matches(filter[i]) : node === filter[i]) {
					return true;
				}
			}
			return false;
		};
	}
	return nodes.filter((item, i) => func.call(item, i, item) === !not, nodes);
}
