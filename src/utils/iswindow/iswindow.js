import $ from "../../core/dabby/dabby.js";
import isWindow from "../../internal/iswindow/iswindow.js";

Object.defineProperty($, "isWindow", {
	value: isWindow
});
