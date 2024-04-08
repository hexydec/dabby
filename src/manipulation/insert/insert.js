import $, {Dabby} from "../../core/dabby/dabby.js";
import isFunction from "../../internal/isfunction/isfunction.js";
import "../../traversal/add/add.js";
import "../../manipulation/clone/clone.js";
import getVal from "../../internal/getval/getval.js";

function factory(name, pos, obj, ...content) {

	// function tracking variables
	const pre = ["prepend", "after"].includes(name);
	let elems,
		i = obj.length,
		len = i,
		isFunc = isFunction(content[0]);

	// multiple arguments containing nodes
	if (!isFunc) {
		elems = content.reduce((dabby, item) => dabby.add(item), $());
	}

	// insert objects onto each element in collection
	while (i--) {

		// retrieve nodes from function
		if (isFunc) {
			elems = getVal([obj[i]], content[0], obj => obj.innerHTML).reduce((dabby, item) => dabby.add(item), $()); // getVal() returns an array so the items need merging into a collection
		}

		// insert nodes
		let backwards = elems.length, // for counting down
			forwards = -1; // for counting up
		while (pre ? backwards-- : ++forwards < backwards) { // insert forwards or backwards?
			obj[i].insertAdjacentElement(pos, i === len-1 ? elems[pre ? backwards : forwards] : elems.eq(pre ? backwards : forwards).clone(true)[0]);
		}
	}
	return obj;
}

/**
 * Add nodes before each object in a Dabby collection
 * 
 * @param {...Node|...Node[]|...Dabby} content A node, array of nodes, or a Dabby collection to attach to each item in the target Dabby collection
 * @returns {Dabby} The original dabby collection
 */
const before = function (...content) {
	return factory("before", "beforeBegin", this, ...content);
};
Object.defineProperty(Dabby.prototype, "before", {value: before});

/**
 * Prepend nodes to each object in a Dabby collection
 * 
 * @param {...Node|...Node[]|...Dabby} content A node, array of nodes, or a Dabby collection to attach to each item in the target Dabby collection
 * @returns {Dabby} The original dabby collection
 */
const prepend = function (...content) {
	return factory("prepend", "afterBegin", this, ...content);
};
Object.defineProperty(Dabby.prototype, "prepend", {value: prepend});

/**
 * Append nodes to each object in a Dabby collection
 * 
 * @param {...Node|...Node[]|...Dabby} content A node, array of nodes, or a Dabby collection to attach to each item in the target Dabby collection
 * @returns {Dabby} The original dabby collection
 */
const append = function (...content) {
	return factory("append", "beforeEnd", this, ...content);
};
Object.defineProperty(Dabby.prototype, "append", {value: append});

/**
 * Add nodes after each object in a Dabby collection
 * 
 * @param {...Node|...Node[]|...Dabby} content A node, array of nodes, or a Dabby collection to attach to each item in the target Dabby collection
 * @returns {Dabby} The original dabby collection
 */
const after = function (...content) {
	return factory("after", "afterEnd", this, ...content);
};
Object.defineProperty(Dabby.prototype, "after", {value: after});