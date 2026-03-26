import $ from "../../../dist/dabby.js";

QUnit.module("Traversal");

QUnit.test("$.fn.even", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div><div class="testtemp3"></div><div class="testtemp4"></div><div class="testtemp5"></div><div class="testtemp6"></div>';

	var obj = $(".test > div");

	assert.equal(obj.even().length, 3, "Returns correct number of even-indexed elements");
	assert.deepEqual(obj.even().get(), [$(".testtemp").get(0), $(".testtemp3").get(0), $(".testtemp5").get(0)], "Selects elements at indices 0, 2, 4");

	// Single element
	assert.equal($(".testtemp").even().length, 1, "Single element returns itself (index 0 is even)");

	// Empty collection
	assert.equal($(".nonexistent").even().length, 0, "Empty collection returns empty");

	test.innerHTML = "";
});
