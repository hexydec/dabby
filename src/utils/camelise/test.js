QUnit.module("Utils");

QUnit.test("camelise", function (assert) {
	assert.equal(camelise("this-is-a-test"), "thisIsATest", "Can camel case a dashed sentence");
	assert.equal(camelise("this-is-a-TEST"), "thisIsATEST", "Can camel case a dashed sentence respecting case");
});
