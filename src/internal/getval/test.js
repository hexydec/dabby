import {$} from "../../../dist/dabby.js";
import getVal from "./getval.js";

QUnit.module("Internal");

QUnit.test("getVal", function (assert) {
	var obj = $(".test").get(0);
	assert.equal(getVal("test"), "test", "Can pass-through a value");
	assert.equal(getVal(function (i) {return this === obj && !i ? "test" : false;}, obj, 0), "test", "When passing function as value, variables and context is correct");
	//assert.equal(getVal(380, obj, 0), "380px", "Can return a number as a px value");
	assert.equal(getVal("380pt", obj, 0), "380pt", "Can pass through a number that already has a suffix");
});
