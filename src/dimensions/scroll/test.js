import $ from "../../../dist/dabby.js";

QUnit.module("Dimensions");

QUnit.test("$.fn.scrollLeft/$.fn.scrollTop", function (assert) {
	var test = document.getElementsByClassName("test")[0];

	test.innerHTML = '<div class="testtemp" style="width:100px;height:100px;overflow:auto;"><div class="testinner" style="width:1000px;height:1000px;"></div></div>';
	var obj = $(".testtemp");

	assert.deepEqual(obj, obj.scrollLeft(10), "Returns self on set");
	assert.equal(obj.get(0).scrollLeft, 10, "Can set scroll value");
	assert.equal(obj.scrollLeft(), 10, "Can get scroll value");
});
