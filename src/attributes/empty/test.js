QUnit.module("Attributes");

QUnit.test("$.fn.empty", function (assert) {
	var main = document.getElementsByClassName("main")[0];
	main.insertAdjacentHtml("beforeEnd", "<span class=\"empty\">Test</span>");
	var empty = $(".empty");
	
	assert.deepEqual(empty.empty(), empty, "Returns itself on empty");
	assert.equal(empty.get(0).innerHTML, "", "Can empty node");
});