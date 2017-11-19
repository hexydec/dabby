QUnit.module("Utils");

QUnit.test("$.isArray", function (assert) {
	var arr = [],
		obj = {};
	assert.ok($.isArray(arr), "Returns true when array");
	arr.push("test");
	assert.ok($.isArray(arr), "Returns true when array");
	assert.ok(!$.isArray(obj), "Returns false when not array");
	obj.test = "test";
	assert.ok(!$.isArray(obj), "Returns false when not array");
});
