QUnit.module("Core");

QUnit.test("$.each", function (assert) {
	var arr = ["foo", "bar"],
		output = [],
		obj = {foo: "foo", bar: "bar"};
		
	$.each(arr, function (i, item) {
		output.push(item);
	});
	assert.deepEqual(arr, output, "$.each array");
	
	output = {};
	$.each(obj, function (item, index) {
		output[index] = item;
	});
	assert.deepEqual(obj, output, "$.extend object");
});

QUnit.test("$.fn.each", function (assert) {
	var main = document.getElementsByClassName("main")[0],
		h1 = document.getElementsByClassName("heading")[0],
		output = [];
	$(".main, .heading").each(function () {
		output.push(this.tagName.toLowerCase());
	});
	assert.deepEqual(output, ["div", "h1"]);
});