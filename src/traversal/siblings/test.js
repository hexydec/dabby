QUnit.module("Traversal");

QUnit.test("$.fn.siblings", function (assert) {
	var test = document.getElementsByClassName("test")[0],
		obj;
	test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div><div class="testtemp3"></div>';
	obj = $(".testtemp2");

	assert.deepEqual(obj.siblings().get(), $(".testtemp, .testtemp3").get(), "Can get an elements siblings");
	assert.deepEqual(obj.siblings(".testtemp3").get(), $(".testtemp3").get(), "Can get an elements siblings filtered by a selector");
	assert.deepEqual(obj.siblings($(".testtemp3")).get(), $(".testtemp3").get(), "Can get an elements siblings filtered by a dabby object");
	assert.deepEqual(obj.siblings($(".testtemp3").get()).get(), $(".testtemp3").get(), "Can get an elements siblings filtered by a node collection");

	test.innerHTML = "";
});
