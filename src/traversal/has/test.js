import $ from "../../../dist/dabby.js";

QUnit.module("Traversal");

QUnit.test("$.fn.has", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp1"><div class="testtemp1-inner">test</div></div><div class="testtemp2"><div class="testtemp2-inner">test</div></div>';
	obj = $(".test > div");

	assert.deepEqual(obj.has(".testtemp1-inner").get(), [obj.get(0)], "Can filter nodes based on children");
	assert.deepEqual(obj.has(".testtemp2-inner").get(), [obj.get(1)], "Can filter nodes based on children");
	assert.deepEqual(obj.has(".testtemp3-inner").get(), [], "Can filter nodes based on children");

	test.innerHTML = "";
});
