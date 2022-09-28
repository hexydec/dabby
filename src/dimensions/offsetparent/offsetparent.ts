import $ from "../../core/dabby/dabby";
import { Dabby } from "../../core/dabby/types";

$.fn.offsetParent = function () : Dabby {
	return this[0] ? $(this[0].offsetParent) : $();
};
