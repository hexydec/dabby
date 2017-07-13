QUnit.module("Core");

QUnit.test("$.map", function (assert) {
	var arr = ["foo", "bar"],
		output = [],
		obj = {foo: "foo", bar: "bar"};
	output = $.map(arr, function (item) {
		return item;
	});
	assert.deepEqual(arr, output, "$.map array");
	
	output = $.map(obj, function (item, index) {
		return item;
	});
	assert.deepEqual(arr, output, "$.extend object");
});