import {$} from "../../../dist/dabby.js";

QUnit.module("Traversal");

QUnit.test("$.fn.children", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
	obj = $(".test");

	assert.deepEqual(obj.children().get(), $(".testtemp, .testtemp2").get(), "Can get child nodes");
	assert.deepEqual(obj.children(".testtemp").get(), $(".testtemp").get(), "Can get and filter child nodes");

	test.innerHTML = "";
});
