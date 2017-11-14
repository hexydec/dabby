QUnit.module("Manipulation");

QUnit.test("$.fn.prepend", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div>';
	var main = $(".testtemp"),
		rmain = document.getElementsByClassName("testtemp")[0];

	assert.deepEqual(main.prepend("<div>Test</div>"), main, "Returns itself when insert");
	assert.equal(main.html(), "<div>Test</div>", "Can insert html");

	// reset
	test.innerHTML = "";
});
