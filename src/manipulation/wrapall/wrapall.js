import $, {Dabby} from "../../core/dabby/dabby.js";
import "../../traversal/eq/eq.js";
import "../../manipulation/clone/clone.js";

Object.defineProperty(Dabby.prototype, "wrapAll", {
	value: function (html) {
		if (this[0]) {
			if (typeof html === "function") {
				html = html.call(this[0]);
			}

			// set variables
			let len = this.length,
				i = 0,
				node = $(html).eq(0).clone(true).get(0);

			// insert clone into parent
			this[0].parentNode.insertBefore(node, null);

			// find innermost child of node
			while (node.firstElementChild) {
				node = node.firstElementChild;
			}

			// attach nodes to the new node
			for (; i < len; i++) {
				node.appendChild(this[i]);
			}
		}
		return this;
	}
});