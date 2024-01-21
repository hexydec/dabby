import {Dabby} from "../../core/dabby/dabby.js";

/**
 * Retrieves the position of the first element in the collection relative to its offset parent
 * 
 * @memberof Dabby#
 * @function position
 * @returns {{top: number, left: number}|undefined} An object containing the properties `top` and `left`, or undefined if the collection is empty
 */
const position = function () {
	if (this[0]) {
		return {left: this[0].offsetLeft, top: this[0].offsetTop};
	}
}

Object.defineProperty(Dabby.prototype, "position", {value: position});
