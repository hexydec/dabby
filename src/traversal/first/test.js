import {$} from "../../../dist/dabby.js";

QUnit.module("Traversal");

QUnit.test("$.fn.first", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp"><div class="class1"></div><div class="class1"></div><div class="class2"><div class="findme"></div></div><div class="class3"><div class="findme"></div></div></div>';
	obj = $(".testtemp div");

	assert.deepEqual($(".testtemp div").first().get(), [$(".testtemp").get(0).getElementsByClassName("class1")[0]]);
	assert.deepEqual($(".testtemp .findme").first().get(), [$(".testtemp").get(0).getElementsByClassName("findme")[0]]);
});
