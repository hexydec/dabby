QUnit.module("Manipulation");

QUnit.test("$.fn.remove", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"><div></div></div><div class="testtemp2"></div>';
	var main = $(".testtemp, .testtemp2"),
		rmain = document.getElementsByClassName("testtemp")[0];

	assert.deepEqual(main.remove(".testtemp2").get(), [rmain], "Returns reduced set when removed");
	assert.ok(document.getElementsByClassName("testtemp2").length === 0, "Removed item from DOM");
});
