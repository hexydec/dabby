import $ from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";

/**
 * A callback to generate class names from a node
 * 
 * @callback classCallback
 * @param {int} [index] The index of the node in the Dabby object 
 * @param {Node} [element] A Node object
 * @returns {(string|string[])} A string specifying the name of the class or an array of classes
 */

/**
 * Adds a class or classes to the nodes in the collection
 * @memberof dabby
 * @method addClass
 * @instance
 * @param {(string|string[]|classCallback)} prop The class name, an array of class names, or a callback to generate the same
 * @returns {dabby} The original dabby collection
 */

/**
 * Removes a class or classes from the nodes in the collection
 * @memberof dabby
 * @method removeClass
 * @instance
 * @param {(string|string[]|classCallback)} prop The class name, an array of class names, or a callback to generate the same
 * @returns {dabby} The original dabby collection
 */

/**
 * Adds or removes a class or classes from the nodes in the collection
 * @memberof dabby
 * @method toggleClass
 * @instance
 * @param {(string|string[]|classCallback)} prop The class name, an array of class names, or a callback to generate the same
 * @param {boolean=} state Sets the state of the toggle where `true` is equivalent to addClass() and `false` to removeClass(), if not specified, each node will be toggled to the opposite of its current state
 * @returns {dabby} The original dabby collection
 */

const funcs = [];
["removeClass", "addClass", "toggleClass"].forEach((func, f) => {

	// remove "Class" from name for classList method and remember
	funcs.push(func.slice(0, -5));

	// create function
	$.fn[func] = function (cls, state) {
		if (this[0]) {
			let i = this.length,
				values = getVal(this, cls, obj => obj.className),
				key = f;

			if (f > 1 && typeof state === "boolean") {
				key = 0 + state;
			}

			// manage classes on nodes
			while (i--) {
				if (typeof values[i] === "string") {
					values[i] = values[i].split(" ");
				}
				for (let n = 0, len = values[i].length; n < len; n++) {
					this[i].classList[funcs[key]](values[i][n]);
				}
			}
		}
		return this;
	};
});
