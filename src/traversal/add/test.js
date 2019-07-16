import $ from "../../../dist/dabby.js";

QUnit.module("Traversal");

QUnit.test("$.fn.add", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj, newobj;
	test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
	obj = $(".testtemp");
	newobj = obj.add(".testtemp2");
	assert.deepEqual(newobj.get(), $(".testtemp, .testtemp2").get(), "Can add nodes");
	assert.deepEqual(obj.get(), $(".testtemp").get(), "Original object remains");

	test.innerHTML = "";
});
