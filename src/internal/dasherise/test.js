QUnit.module("Internal");

QUnit.test("dasherise", function (assert) {
	assert.equal(dasherise("thisIsATest"), "this-is-a-test", "Can dasherise a camel-cased sentence");
	assert.equal(dasherise("thisIsATEST"), "this-is-a-t-e-s-t", "Can dasherise a camel-cased sentence respecting case");
});
