QUnit.module("Traversal");

QUnit.test("$.fn.is", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
	obj = $(".testtemp, .testtemp2");

	assert.ok(obj.is(".testtemp"), "Returns true when node matches selector");
	assert.ok(obj.is(document.getElementsByClassName("testtemp")[0]), "Returns true when node matches element");
	assert.ok(obj.is($(".testtemp")), "Returns true when node matches dabby collection");

	test.innerHTML = "";
});
