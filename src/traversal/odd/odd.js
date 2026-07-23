import $, { Dabby } from "../../core/dabby/dabby.js";

/**
 * Select odd-indexed elements from the collection (indices 1, 3, 5, ...)
 *
 * @returns {Dabby} A new Dabby collection containing the odd-indexed elements
 */
function odd() {
	const nodes = [];
	for (let i = 1; i < this.length; i += 2) {
		nodes.push(this[i]);
	}
	return $(nodes);
}
Object.defineProperty(Dabby.prototype, "odd", {value: odd, configurable: true});
