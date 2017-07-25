QUnit.module("Attributes");

QUnit.test("$.clone", function (assert) {
	var clone = $(".main").clone(), main = document.getElementsByClassName("main")[0];
	
	// set and get class
	assert.ok(clone.get(0).className === "main" && !clone.get(0).isSameNode(main), "Can clone objects");
});