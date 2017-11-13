QUnit.module("Manipulation");

QUnit.test("$.fn.unwrap", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"><div class="testtemp2">test 2</div><div class="testtemp3">test 3</div></div>';
	var obj = $(".testtemp2"),
		parent = $(".testtemp");

	assert.deepEqual(obj.unwrap().get(), parent.get(), "Returns self on unwrap");
	assert.deepEqual($(".test > div").get(), $(".testtemp2, .testtemp3").get(), "Can unwrap node");
});
