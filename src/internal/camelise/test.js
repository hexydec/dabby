import camelise from "./camelise.js";

QUnit.module("Internal");

QUnit.test("camelise", function (assert) {
	assert.equal(camelise("this-is-a-test"), "thisIsATest", "Can camel case a dashed sentence");
	assert.equal(camelise("this-is-a-TEST"), "thisIsATEST", "Can camel case a dashed sentence respecting case");
	assert.equal(camelise("--css-variable-Camel-tESt"), "--css-variable-Camel-tESt", "CSS variables keep the same case");
});
