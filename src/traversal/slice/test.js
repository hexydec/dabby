import $ from "../../../dist/dabby.js";

QUnit.module("Traversal");

QUnit.test("$.fn.slice", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div><div class="testtemp3"></div><div class="testtemp4"></div><div class="testtemp5"></div><div class="testtemp6"></div>';

	obj = $(".test > div");

	assert.deepEqual(obj.slice(4).get(), $(".testtemp5, .testtemp6").get(), "Can slice a collection");
	assert.deepEqual(obj.slice(2, 4).get(), $(".testtemp3, .testtemp4").get(), "Can slice a collection with start and end indicies");
	assert.deepEqual(obj.slice(-2).get(), $(".testtemp5, .testtemp6").get(), "Can slice a collection with a negative start");
	assert.deepEqual(obj.slice(-3, -1).get(), $(".testtemp4, .testtemp5").get(), "Can slice a collection with negative start and end indicies");
	test.innerHTML = "";
});
