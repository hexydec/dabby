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

QUnit.test("$.fn.init CSS selector", function (assert) {
	var main = document.getElementsByClassName("main")[0],
		h1 = document.getElementsByTagName("h1")[0],
		checkbox = document.querySelectorAll("input[type=checkbox]")[0];
	assert.ok($(".main").get(0) === main, "Can select object by class");
	assert.ok($(".main h1").get(0) === h1, "Can select child object");
	assert.ok($(".main > h1").get(0) === h1, "Can select direct child object");
	assert.ok($(".main > h1:first-child").get(0) === h1, "Can select first child");
	assert.ok($("input[type=checkbox]").get(0) === checkbox, "Can select with attributes");
	assert.ok($("input[type=checkbox]:checked").get(0) === checkbox, "Can select with attributes");
});

/*QUnit.test("$.fn.init Ready Function", function (assert) {
	var ready1 = false,
		ready2 = false;
	$(function () {
		ready1 = true;
	});
	$(function () {
		ready2 = true;
	});
	window.onload = function () {
		assert.ok(ready1, "Ready Callback 1 Fired");
		assert.ok(ready2, "Ready Callback 1 Fired");
	};
});*/