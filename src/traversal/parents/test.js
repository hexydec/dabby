QUnit.module("Traversal");

QUnit.test("$.fn.parent/$.fn.parents", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp"><div class="testtemp2"><div class="testtemp3">test</div></div></div>';
	obj = $(".testtemp3"),
	parents = [],
	parent = obj.get(0);

	assert.deepEqual(obj.parent().get(), $(".testtemp2").get(), "Can select parent");
	assert.deepEqual(obj.parent(".testtemp2").get(), $(".testtemp2").get(), "Can select parent with selector");
	assert.deepEqual(obj.parent(".testtemp").get(), [], "Does select parent when selector doesn't match");

	while (parent.parentNode) {
		parents.push(parent.parentNode);
		parent = parent.parentNode;
	}
	assert.deepEqual(obj.parents().get(), parents, "Can select parents");
});