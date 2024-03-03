import $, {Dabby} from "../../core/dabby/dabby.js";

Object.defineProperty(Dabby.prototype, "find", {
	value: function (selector) {
		return $(selector, this);
	}
});
