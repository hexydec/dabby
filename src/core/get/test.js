QUnit.module("Core");

QUnit.test("$.fn.get", function (assert) {
	var main = document.getElementsByClassName("main")[0],
		h1 = document.getElementsByClassName("heading")[0];
	assert.deepEqual($(".main, .heading").get(), [main, h1]);
	assert.deepEqual($(".main, .heading").get(0), main);
});