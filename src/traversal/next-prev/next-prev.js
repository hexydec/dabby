import $, {Dabby} from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

const factory = (obj, selector, filter, notall, until, next) => {
	let nodes = [],
		i = 0,
		len = obj.length, 
		method = (next ? "next" : "previous") + "ElementSibling";;

	// look through each node and get siblings
	for (; i < len; i++) {
		let sibling = obj[i][method];
		while (sibling) {

			// end when we match until
			if (until && filterNodes(sibling, selector).length) {
				break;
			}

			// add the node
			nodes.push(sibling);

			// end when not finding all
			if (notall) {
				break;
			}
			sibling = sibling[method];
		}
	}

	// swap args for *Until methods
	if (until) {
		selector = filter;
	}

	// return new collection
	return $(selector ? filterNodes(nodes, selector) : nodes);
};

Object.defineProperty(Dabby.prototype, "next", {
	value: function (selector, filter) {
		return factory(this, selector, filter, true, false, true);
	}
});

Object.defineProperty(Dabby.prototype, "nextAll", {
	value: function (selector, filter) {
		return factory(this, selector, filter, false, false, true);
	}
});

Object.defineProperty(Dabby.prototype, "nextUntil", {
	value: function (selector, filter) {
		return factory(this, selector, filter, false, true, true);
	}
});

Object.defineProperty(Dabby.prototype, "prev", {
	value: function (selector, filter) {
		return factory(this, selector, filter, true);
	}
});

Object.defineProperty(Dabby.prototype, "prevAll", {
	value: function (selector, filter) {
		return factory(this, selector, filter);
	}
});

Object.defineProperty(Dabby.prototype, "prevUntil", {
	value: function (selector, filter) {
		return factory(this, selector, filter, false, true);
	}
});

// ["next", "nextAll", "nextUntil", "prev", "prevAll", "prevUntil"].forEach((func, f) => {
// 	const notall = f % 3 === 0,
// 		until = f % 3 > 1,
// 		method = (f < 3 ? "next" : "previous") + "ElementSibling";

// 	Object.defineProperty(Dabby.prototype, func, {
// 		value: function (selector, filter) {
// 			let nodes = [],
// 				i = 0,
// 				len = this.length;

// 			// look through each node and get siblings
// 			for (; i < len; i++) {
// 				let sibling = this[i][method];
// 				while (sibling) {

// 					// end when we match until
// 					if (until && filterNodes(sibling, selector).length) {
// 						break;
// 					}

// 					// add the node
// 					nodes.push(sibling);

// 					// end when not finding all
// 					if (notall) {
// 						break;
// 					}
// 					sibling = sibling[method];
// 				}
// 			}

// 			// swap args for *Until methods
// 			if (until) {
// 				selector = filter;
// 			}

// 			// return new collection
// 			return $(selector ? filterNodes(nodes, selector) : nodes);
// 		}
// 	});
// });
