import {Dabby} from "../../core/dabby/dabby.js";
import "../eq/eq.js";

/**
 * Retrieve the last item in the collection
 * 
 * @memberof Dabby#
 * @function last
 * @returns {Dabby} A new Dabby collection containing the last item in the collection, or an empty collection if the original collection is empty
 */
Object.defineProperty(Dabby.prototype, "last", {
	value: function () {
		return this.eq(-1);
	}
});