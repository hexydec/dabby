import $ from "../../../dist/dabby.js";

QUnit.module("Utils");

QUnit.test("$.map", function (assert) {
	var arr = ["foo", "bar", ["foo2", "bar2"]],
		obj = {foo: "foo", bar: "bar", arr: ["foo2", "bar2"]},
		result = ["foo", "bar", ["foo2", "bar2"]],
		output = [];
	output = $.map(arr, function (item) {
		return item;
	});
	assert.deepEqual(arr, output, "$.map array");

	output = $.map(obj, function (item, index) {
		return item;
	});
	assert.deepEqual(result, output, "$.map object");
});
