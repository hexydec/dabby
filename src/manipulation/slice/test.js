import {$} from "../../../dist/dabby.js";

QUnit.module("Manipulation");

QUnit.test("$.fn.slice", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div><div class="testtemp3"></div>';
	var main = $(".test > div");

	assert.deepEqual(main.slice(0, 1).get(), [document.getElementsByClassName("testtemp")[0]], "Can slice nodes");
	assert.deepEqual(main.slice(1, 3).get(), $(".testtemp2, .testtemp3").get(), "Can slice nodes");
});
