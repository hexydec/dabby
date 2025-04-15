import $, {Dabby} from "../../core/dabby/dabby.js";

/**
 * Reduce a collection by the specified indicies
 * 
 * @memberof Dabby#
 * @function siblings
 * @type {{
 *  (start:Number) => Dabby;
 * 	(start:Number, end:Number) => Dabby;
 * }}
 * @param {Number} start A number indicating the start index
 * @param {Number} end A number indicating the end index
 * @returns {Dabby} A Dabby collection 
 */
const slice = function (start, end) {
	return $(Array.from(this).slice(start, end));
};
Object.defineProperty(Dabby.prototype, "slice", {value: slice});
