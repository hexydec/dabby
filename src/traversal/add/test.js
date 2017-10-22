QUnit.module("Traversal");

QUnit.test("$.fn.add", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
	obj = $(".testtemp");
	assert.deepEqual(obj.add(".testtemp2").get(), $(".testtemp, .testtemp2").get(), "Can add nodes");

	test.innerHTML = "";
});
