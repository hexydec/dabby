import $ from "../../../dist/dabby.js";

QUnit.module("Utils");

QUnit.test("$.each", function (assert) {
	var arr = [1, 2, 3, 4],
		obj = {no1: 1, no2: 2, no3: 3, no4: 4},
		output = [],
		result = [2, 4, 6, 8],
		numeric = true;

	// test object
	output = [];
	$.each(obj, function (i, item) {
		output.push(item * 2);
	});
	assert.deepEqual(result, output, "Can run a function on an object");

	// test array
	$.each(arr, function (i, item) {
		output.push(item * 2);
		if (typeof i !== "int") {
			numeric = false;
		}
	});
	assert.deepEqual(result, output, "Can run a function on an array");
	assert.deepEqual(numeric, true, "Keys returned from array are numeric");
});
