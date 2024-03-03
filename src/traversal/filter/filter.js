import $, {Dabby} from "../../core/dabby/dabby.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

const factory = (obj, selector, filter, not) => {
	const nodes = filterNodes(obj, selector, not); // "not"
	return filter ? $(nodes) : !!nodes.length; // not "is" : "is"
};

Object.defineProperty(Dabby.prototype, "is", {
	value: function (selector) {
		return factory(this, selector);
	}
});

Object.defineProperty(Dabby.prototype, "filter", {
	value: function (selector) {
		return factory(this, selector, true);
	}
});

Object.defineProperty(Dabby.prototype, "not", {
	value: function (selector) {
		return factory(this, selector, true, true);
	}
});
