import $ from "../../../dist/dabby.js";

QUnit.module("Core");

QUnit.test("$.fn.map", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"><p>first</p></div><div class="testtemp"><p>second</p></div>';

	// simple test
	var output = $(".testtemp").map(function () {
		return $("p", this);
	});
	assert.deepEqual($("<div>").append(output).html(), "<p>first</p><p>second</p>", "Can extract children from a list of nodes using $.fn.map()");
});
