import {$} from "../../../dist/dabby.js";

QUnit.module("Manipulation");

QUnit.test("$.fn.html", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div>';
	var main = $(".testtemp"), rmain = document.getElementsByClassName("testtemp")[0];
	rmain.insertAdjacentHTML("beforeEnd", "<div>Test</div>");
	var obj = $(".html");

	assert.equal(main.html(), "<div>Test</div>", "Can read html");
	var html = main.html("<div>Test</div>");
	assert.equal(main.get(0).innerHTML, "<div>Test</div>", "Can set html");

	// reset
	test.innerHTML = "";
});
