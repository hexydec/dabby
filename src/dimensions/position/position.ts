import $ from "../../core/dabby/dabby";
import { Position } from "../../core/dabby/types";

$.fn.position = function () : Position {
	if (this[0]) {
		return {left: this[0].offsetLeft, top: this[0].offsetTop};
	}
};
