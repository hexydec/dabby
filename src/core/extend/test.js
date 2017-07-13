QUnit.module("Core");

QUnit.test("$.extend", function (assert) {
	assert.deepEqual($.extend({foo: "foo"}, {bar: "bar"}), {foo: "foo", bar: "bar"}, "$.extend simple");
	assert.deepEqual($.extend({foo: "foo", bar: "foo"}, {bar: "bar"}), {foo: "foo", bar: "bar"}, "$.extend overwrite");
});