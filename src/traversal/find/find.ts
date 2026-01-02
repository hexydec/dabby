import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import type {} from "../../modular.js";

function find(this: Dabby, selector: Selector): Dabby {
	return $(selector, this);
}

Object.defineProperty(Dabby.prototype, "find", { value: find, configurable: true });
