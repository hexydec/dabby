import $, {Dabby} from "../../core/dabby/dabby.js";

Object.defineProperty(Dabby.prototype, "has", {
	value: function (selector) {
		const compare = $(selector).get();
		return $(Array.from(this).filter(node => compare.some(item => node.contains(item))));
	}
});
