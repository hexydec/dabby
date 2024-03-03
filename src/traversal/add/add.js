import $, {Dabby} from "../../core/dabby/dabby.js";
import "../../core/get/get.js";

Object.defineProperty(Dabby.prototype, "add", {
	value: function (nodes, context) {
		nodes = $(nodes, context).get();
		return $(Array.from(this).concat(nodes));
	}
});
