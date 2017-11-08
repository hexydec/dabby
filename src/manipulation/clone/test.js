QUnit.module("Manipulation");

QUnit.test("$.fn.clone", function (assert) {
	var clone = $(".test").clone(), main = document.getElementsByClassName("test")[0];

	// set and get class
	assert.ok(clone.get(0).className === "test" && !clone.get(0).isSameNode(main), "Can clone objects");
});
