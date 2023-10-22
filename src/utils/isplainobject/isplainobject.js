import $ from "../../core/dabby/dabby.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";

Object.defineProperty($, "isPlainObject", {
	value: isPlainObject
});
