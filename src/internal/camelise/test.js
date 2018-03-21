QUnit.module("Internal");

QUnit.test("camelise", function (assert) {
	assert.equal(internals.camelise("this-is-a-test"), "thisIsATest", "Can camel case a dashed sentence");
	assert.equal(internals.camelise("this-is-a-TEST"), "thisIsATEST", "Can camel case a dashed sentence respecting case");
});
