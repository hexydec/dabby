import $ from "../../../dist/dabby.js";

import getVal from "./getval.js";

QUnit.module("Internal");

QUnit.test("getVal", function (assert) {
	var obj = $(".test");
	assert.deepEqual(getVal(obj, "test"), ["test"], "Can pass-through a value");
	assert.deepEqual(getVal(obj, function (i) {return this === obj[0] && !i ? "test" : false;}), ["test"], "When passing function as value, variables and context is correct");
});
