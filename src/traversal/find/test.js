QUnit.module("Traversal");

QUnit.test("$.fn.find", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp"><div class="class1"></div><div class="class1"></div><div class="class2"><div class="findme"></div></div><div class="class3"><div class="findme"></div></div></div>';
	obj = $(".testtemp");

	assert.deepEqual(obj.find(".findme").get(), $(".testtemp .findme").get());
	assert.deepEqual(obj.find(obj.get(0).getElementsByClassName("class1")), $(".testtemp .class1").get());
});
