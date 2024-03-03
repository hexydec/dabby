import $, {Dabby} from "../../core/dabby/dabby.js";
import "../../events/off/off.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

const factory = (obj, selector, remove) => {
	let i = obj.length,
		nodes = [];

	// detach selected nodes
	while (i--) {
		if (!selector || filterNodes(obj[i], selector).length) {

			// remove data from removed nodes
			if (remove) {
				$(obj[i]).off();
			}
			nodes.push(obj[i].parentNode ? obj[i].parentNode.removeChild(obj[i]) : obj[i]); // only remove it attached to something
		}
	}

	// create a new dabby object to return
	return remove ? obj : $(nodes);
};

const detach = function (selector) {
	return factory(this, selector, false);
}
Object.defineProperty(Dabby.prototype, "detach", {value: detach});

const remove = function (selector) {
	return factory(this, selector, true);
}
Object.defineProperty(Dabby.prototype, "remove", {value: remove});