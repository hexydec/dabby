QUnit.module("Internal");

QUnit.test("filterNodes", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj,
		filtered;
	test.innerHTML = '<div class="testtemp"><div class="class1"></div><div class="class1"></div><div class="class2"></div><div class="class3"></div></div>';
	obj = $(".testtemp div");
	filtered = $(".testtemp .class1");

	assert.deepEqual(internals.filterNodes(obj, ".class1"), filtered.get());
	assert.deepEqual(internals.filterNodes(obj, filtered), filtered.get());
	assert.deepEqual(internals.filterNodes(obj, filtered.get()), filtered.get());
	assert.deepEqual(internals.filterNodes(obj, function (i, node) {
		return node.className === "class1";
	}), filtered.get());
	assert.deepEqual(internals.filterNodes(obj, ".class2, .class3", true), filtered.get());
});
