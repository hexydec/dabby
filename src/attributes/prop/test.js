QUnit.module("Attributes");

QUnit.test("$.fn.prop", function (assert) {
	var obj = $("<h1>", {tabindex: 1});

	assert.deepEqual(obj, obj.prop("title", "test"), "Returns self on set");
	assert.equal(obj.get(0).title, "test", "Can set property");
	assert.equal(obj.prop("title"), "test", "Can read property");
	assert.equal(obj.prop("tabindex"), 1, "Can read property");
});
