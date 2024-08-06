import {Dabby} from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";

/**
 * @callback scrollCallback
 * @param {number} index The index of the current item in the collection
 * @param {number|string} currentValue The current value of the scroll coordinate
 * @returns {number|string} The new value
 */

/**
 * Scroll factory function
 * 
 * @type {{
 * 	{} => number|undefined;
 * 	{number|scrollCallback} => Dabby;
 * }}
 * @param {number|scrollCallback} [pos] The scroll value to be set on each item in the collection, omit to retrieve the value
 * @returns {number|Dabby|undefined} The scroll position of the first item in the collection when retrieving, or the original Dabby collection when setting
 */
const factory = (obj, func, pos) => {

	// set
	if (pos !== undefined) {
		let i = obj.length,
			values = getVal(obj, pos, obj => obj[func]);

		while (i--) {
			obj[i][func] = values[i];
		};
		return obj;
	}

	// get
	if (obj[0]) {
		return obj[0][obj[0] === window ? (func === "scrollTop" ? "pageYOffset" : "pageXOffset") : func];
	}
};

/**
 * Retrieves the left scroll position of the first element in the collection, or sets the scroll position on each item in the collection
 * 
 * @type {{
 * 	{} => number|undefined;
* 	{number|scrollCallback} => Dabby;
* }}
 * @param {number|scrollCallback} [pos] The scroll value to be set on each item in the collection, omit to retrieve the value
 * @returns {number|Dabby|undefined} The scroll position of the first item in the collection when retrieving, or the original Dabby collection when setting
 */
const scrollLeft = function (pos) {
	return factory(this, "scrollLeft", pos);
};
Object.defineProperty(Dabby.prototype, "scrollLeft", {value: scrollLeft});

/**
 * Retrieves the top scroll position of the first element in the collection, or sets the scroll position on each item in the collection
 * 
 * @type {{
 * 	{} => number|undefined;
* 	{number|scrollCallback} => Dabby;
* }}
 * @param {number|scrollCallback} [pos] The scroll value to be set on each item in the collection, omit to retrieve the value
 * @returns {number|Dabby|undefined} The scroll position of the first item in the collection when retrieving, or the original Dabby collection when setting
 */
const scrollTop = function (pos) {
	return factory(this, "scrollTop", pos);
};
Object.defineProperty(Dabby.prototype, "scrollTop", {value: scrollTop});