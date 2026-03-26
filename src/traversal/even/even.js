import $, { Dabby } from "../../core/dabby/dabby.js";

/**
 * Select even-indexed elements from the collection (indices 0, 2, 4, ...)
 *
 * @returns {Dabby} A new Dabby collection containing the even-indexed elements
 */
function even() {
	const nodes = [];
	for (let i = 0; i < this.length; i += 2) {
		nodes.push(this[i]);
	}
	return $(nodes);
}
Object.defineProperty(Dabby.prototype, "even", {value: even, configurable: true});
