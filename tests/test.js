QUnit.test("$.isWindow", function (assert) {
	assert.equal($.isWindow(window), true);
	assert.equal($.isWindow(document), false);
});

QUnit.test("$.isEmptyObject", function (assert) {
	assert.equal($.isEmptyObject({}), true);
	assert.equal($.isEmptyObject({foo: "bar"}), false);
});

QUnit.test("$.extend", function (assert) {
	assert.deepEqual($.extend({foo: "foo"}, {bar: "bar"}), {foo: "foo", bar: "bar"}, "$.extend simple");
	assert.deepEqual($.extend({foo: "foo", bar: "foo"}, {bar: "bar"}), {foo: "foo", bar: "bar"}, "$.extend overwrite");
});

QUnit.test("$.each", function (assert) {
	var arr = ["foo", "bar"],
		output = [],
		obj = {foo: "foo", bar: "bar"};
	$.each(arr, function (item) {
		output.push(item);
	});
	assert.deepEqual(arr, output, "$.each array");
	
	output = {};
	$.each(obj, function (item, index) {
		output[index] = item;
	});
	assert.deepEqual(obj, output, "$.extend object");
});

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

QUnit.test("$.isArray", function (assert) {
	var arr = ["foo", "bar"];
	assert.equal($.inArray(arr, "foo"), 0);
	assert.equal($.inArray(arr, "bar"), 1);
	assert.equal($.inArray(arr, "boo"), -1);
});

QUnit.test("$.fn.init", function (assert) {
	assert.ok($(".main").get(0) === document.getElementsByClassName("main")[0], "Object is correct");
});