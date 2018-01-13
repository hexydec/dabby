QUnit.module("Traversal");

QUnit.test("$.fn.index", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj, obj2;
	test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div><div class="testtemp3"></div>';
	obj = $(".test div"),
	obj2 = $(".test .testtemp2, .test .testtemp3");

	assert.equal(obj.index(".testtemp"), 0, "Can find element index in a set");
	assert.equal(obj.index(".testtemp2"), 1, "Can find element index in a set");
	assert.equal(obj.index(".testtemp3"), 2, "Can find element index in a set");
	assert.equal(obj2.index(".testtemp3"), 1, "Can find element index in a set");

	assert.equal(obj2.index(), 1, "Can find element index amongst its siblings");
	assert.equal($(".test .testtemp3").index(), 2, "Can find element index amongst its siblings");

	test.innerHTML = "";
});
