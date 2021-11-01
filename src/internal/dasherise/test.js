import dasherise from "./dasherise.js";

QUnit.module("Internal");

QUnit.test("dasherise", function (assert) {
	assert.equal(dasherise("thisIsATest"), "this-is-a-test", "Can dasherise a camel-cased sentence");
	assert.equal(dasherise("thisIsATEST"), "this-is-a-t-e-s-t", "Can dasherise a camel-cased sentence respecting case");
	assert.equal(dasherise("--this-Is-A-TEST"), "--this-Is-A-TEST", "Leave CSS variable names as they are");
});
