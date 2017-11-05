QUnit.module("Attributes");

QUnit.test("$.fn.empty", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div>';
	var main = document.getElementsByClassName("testtemp")[0];
	main.insertAdjacentHTML("beforeEnd", "<span>Empty</span>");
	var empty = $(".testtemp");

	assert.deepEqual(empty.empty(), empty, "Returns itself on empty");
	assert.equal(empty.get(0).innerHTML, "", "Can empty node");

	// reset
	test.innerHTML = "";
});
