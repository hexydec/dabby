import $ from "../../../dist/dabby.js";

QUnit.module("Utils");

QUnit.test("$.each", function (assert) {
	var arr = [1, 2, 3, 4],
		obj = {no1: 1, no2: 2, no3: 3, no4: 4},
		output = [],
		result = [2, 4, 6, 8];

	// test array
	$.each(arr, function (i, item) {
		output.push(item * 2);
	});
	assert.deepEqual(result, output, "Can run a function on an array");

	// test array
	output = [];
	$.each(obj, function (i, item) {
		output.push(item * 2);
	});
	assert.deepEqual(result, output, "Can run a function on an object");
});
