import {$} from "../../../dist/dabby.js";

QUnit.module("Traversal");

QUnit.test("$.fn.has", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp"><div class="testtemp2">test</div></div>';
	obj = $(".test");

	assert.deepEqual(obj.has(".testtemp").get(0), obj.get(0), "Can filter nodes based on children");
	assert.deepEqual(obj.has(".testtemp2").get(0), obj.get(0), "Can filter nodes based on children");
	assert.deepEqual(obj.has(".testtemp3").get(), $().get(), "Can filter nodes based on children");

	test.innerHTML = "";
});
