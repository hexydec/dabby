import $ from "../../../dist/dabby.js";

QUnit.module("Utils");

QUnit.test("$.each", function (assert) {
	var arr = [1, 2, 3, 4],
		obj = {no1: 1, no2: 2, no3: 3, no4: 4},
		arraylike = {0: 1, 1: 2, 2: 3, 3: 4, "test": 42, length: 4},
		output = [],
		result = [2, 4, 6, 8],
		numeric = true;

	// test object
	$.each(obj, function (i, item) {
		output.push(item * 2);
	});
	assert.deepEqual(result, output, "Can run a function on an object");

	// test array
	output = [];
	$.each(arr, function (i, item) {
		output.push(item * 2);
		if (typeof i !== "number") {
			numeric = false;
		}
	});
	assert.deepEqual(result, output, "Can run a function on an array");
	assert.deepEqual(numeric, true, "Keys returned from array are numeric");

	// test array like objects
	output = [];
	$.each(arr, function (i, item) {
		output.push(item * 2);
	});
	assert.deepEqual(result, output, "Can run a function on an array-like object");
});
