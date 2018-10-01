import {$} from "../../../dist/dabby.js";

QUnit.module("Core");

QUnit.test("$.fn.map", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp">first</div><div class="testtemp">second</div>';
	var output = $(".testtemp").map(function () {
		return this.innerText;
	});
	assert.deepEqual(Array.from(output), ["first", "second"]);
});
