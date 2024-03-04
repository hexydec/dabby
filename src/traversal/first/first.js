import $, {Dabby} from "../../core/dabby/dabby.js";

Object.defineProperty(Dabby.prototype, "first", {
	value: function () {
		return $(this[0]);
	}
});
