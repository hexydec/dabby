import $ from "../../../dist/dabby.js";

QUnit.module("Core");

QUnit.test("$.fn.map", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp">first box</div><div class="testtemp">second box</div>';

	// simple test
	var output = $(".testtemp").map(function () {
		return this.innerText;
	});
	assert.deepEqual(Array.from(output), ["first box", "second box"], "Can extract text from nodes using $.fn.map");

	// array test
	var output = $(".testtemp").map(function () {
		return this.innerText.split(" ");
	});
	assert.deepEqual(Array.from(output), ["first", "box", "second", "box"], "Can extract text and flatten the result from nodes using $.fn.map");
});
