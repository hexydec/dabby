import {$} from "../../../dist/dabby.js";

QUnit.module("Core");

QUnit.test("$.fn.each", function (assert) {
	var main = document.getElementsByClassName("main")[0],
		h1 = document.getElementsByClassName("heading")[0],
		output = [];
	$(".main, .heading").each(function () {
		output.push(this.tagName.toLowerCase());
	});
	assert.deepEqual(output, ["div", "h1"]);
});
