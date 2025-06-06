import {Dabby} from "../../core/dabby/dabby.js";
import $ from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";
import "../../core/each/each.js";

/**
 * @callback offsetCallback
 * @param {number} index The index of the current item in the collection
 * @param {number|string} currentValue The current value of the input control
 * @returns {number|string} The new value
 */

/**
 * @typedef {{top: number, left: number}} coords
 */

/**
 * Run a custom callback function on each item in a Dabby collection
 * 
 * @type {{
 * 	{} => coords;
 * 	(coords:coords|offsetCallback) => Dabby;
* }}
 * @param {coords|offsetCallback} coords - A callback to process each node in the Dabby object
 * @returns {Dabby|coords} The original collection, or a object containing `top` and `left` properties
 */
const offset = function (coords) {

	// set
	if (coords) {

		// prepare values
		let values = getVal(this, coords, obj => $(obj).offset()), // copy the object
			i = this.length;

		while (i--) {

			// set position to relative if not positioned
			let pos = getComputedStyle(this[i]).position;
			if (pos === "static") {
				values[i].position = pos = "relative";
			}

			// take off offset parent position
			const parent = this[i][pos === "relative" ? "parentNode" : "offsetParent"];
			$.each($(parent).offset(), (key, val) => values[i][key] -= val);

			// relative add inner offset
			if (pos === "relative") {
				const style = getComputedStyle(parent);
				values[i].top -= parseFloat(style.paddingTop) + parseFloat(style.borderTopWidth);
				values[i].left -= parseFloat(style.paddingLeft) + parseFloat(style.borderLeftWidth);
			}
		}

		// update values in one hit to prevent thrashing
		i = this.length;
		while (i--) {
			$.each(values[i], (key, val) => this[i].style[key] = val + (isNaN(val) ? "" : "px"));
		}
		return this;
	}

	// get
	if (this[0]) {
		const doc = document.documentElement,
			pos = this[0].style.position === "fixed",
			rect = this[0].getBoundingClientRect();
		return {
			top: rect.top + (pos ? 0 : doc.scrollTop),
			left: rect.left + (pos ? 0 : doc.scrollLeft)
		};
	}
};

Object.defineProperty(Dabby.prototype, "offset", {value: offset});