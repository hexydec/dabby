import {Dabby} from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";

/**
 * A callback to generate class names from a node
 * 
 * @callback classCallback
 * @param {number} [index] The index of the node in the Dabby object 
 * @param {Node} [element] A Node object
 * @returns {(string|string[])} A string specifying the name of the class or an array of classes
 */

const funcs = ["remove", "add", "toggle"],
	factory = function (f, cls, state) {
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
	
/**
 * Adds a class or classes to the nodes in the collection
 * 
 * @memberof Dabby#
 * @function removeClass
 * @param {(string|string[]|classCallback)} cls The class name, an array of class names, or a callback to generate the same
 * @returns {Dabby} The original dabby collection
 */
const remove = function (cls) {
	return factory.apply(this, 0, cls);
}
	
/**
 * Removes a class or classes from the nodes in the collection
 * 
 * @memberof Dabby#
 * @function addClass
 * @param {(string|string[]|classCallback)} cls The class name, an array of class names, or a callback to generate the same
 * @returns {Dabby} The original dabby collection
 */
const add = function (cls) {
	return factory.apply(this, 1, cls);
};
	
/**
 * Adds or removes a class or classes from the nodes in the collection
 * 
 * @memberof Dabby#
 * @function toggleClass
 * @param {(string|string[]|classCallback)} cls The class name, an array of class names, or a callback to generate the same
 * @param {boolean} [state] Sets the state of the toggle where `true` is equivalent to addClass() and `false` to removeClass(), if not specified, each node will be toggled to the opposite of its current state
 * @returns {Dabby} The original dabby collection
 */
const toggle = function (cls, state) {
	return factory.apply(this, 2, cls, state);
};

Object.defineProperty(Dabby.prototype, "removeClass", {value: remove});
Object.defineProperty(Dabby.prototype, "addClass", {value: add});
Object.defineProperty(Dabby.prototype, "toggleClass", {value: toggle});