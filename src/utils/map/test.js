import $ from "../../../dist/dabby.js";

QUnit.module("Utils");

QUnit.test("$.map", function (assert) {
	var arr = ["foo", "bar", ["foo2", "bar2", ["foo3", "bar3"]], null, undefined],
		obj = {foo: "foo", bar: "bar", arr: ["foo2", "bar2", ["foo3", "bar3"]], testn: null, testu: undefined},
		result = ["foo", "bar", "foo2", "bar2", ["foo3", "bar3"]],
		output = [];
	output = $.map(arr, function (item) {
		return item;
	});
	assert.deepEqual(output, result, "$.map array");

	output = $.map(obj, function (item, index) {
		return item;
	});
	assert.deepEqual(output, result, "$.map object");
});
