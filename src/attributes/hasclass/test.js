QUnit.module("Attributes");

QUnit.test("$.fn.hasClass", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp testtemp2"></div>';
	var obj = $(".testtemp");

	assert.ok(obj.hasClass("testtemp2"), "Can detect class");
	assert.ok(!obj.hasClass("testtemp3"), "Can detect class is not on object");
});
