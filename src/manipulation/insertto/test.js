import {$} from "../../../dist/dabby.js";

QUnit.module("Manipulation");

QUnit.test("$.fn.insertTo", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div>';
	var main = $("<div>Test</div>"),
		rmain = document.getElementsByClassName("testtemp")[0],
		test;

	assert.deepEqual(main.prependTo(".testtemp").get(), main.get(), "Returns itself when inserted");
	assert.equal($(".testtemp").html(), "<div>Test</div>", "Can insert html");

	// reset
	test.innerHTML = "";
});
