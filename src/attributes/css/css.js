import $ from "../../core/dabby/dabby.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import setCss from "../../internal/setcss/setcss.js";
import dasherise from "../../internal/dasherise/dasherise.js";

/**
 * A callback to generate class names from a node
 * 
 * @callback cssCallback
 * @param {int} [index] The index of the node in the Dabby object 
 * @param {Node} [element] A Node object
 * @returns {string} A string specifying the CSS value
 */

/**
 * Retrieves the requested style properties from the first item in a collection or sets the specified CSS style(s) to each item in a collection
 * @memberof dabby
 * @method css
 * @instance
 * @param {(string|string[]|Object)} props The property name, an array or proprty names, or an object of property key/values, where the values are specified as per `value`
 * @param {(string|cssCallback)=} value A string containing the value to set, or a callback function to generate a value
 * @returns {(dabby|string)} The original dabby collection, or the requested value
 */

Object.defineProperty($.fn, "css", {
	value: function (props, value) {

		// set the values
		if (value !== undefined || isPlainObject(props)) {
			return setCss(this, props, value);
		}

		// retrieve value from first property
		if (this[0]) {
			let name = props,
				i,
				style = getComputedStyle(this[0], ""),
				output = {},
				ret = false;

			// requested single value, normalise to array
			if (typeof name === "string") {
				props = [name];
				ret = true;
			}

			// gather values
			i = props.length;
			while (i--) {
				output[props[i]] = style.getPropertyValue(dasherise(props[i]));
				if (ret) {
					return output[props[i]];
				}
			}
			return output;
		}
	}
});
