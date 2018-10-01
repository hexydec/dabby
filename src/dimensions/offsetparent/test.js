import {$} from "../../../dist/dabby.js";

QUnit.module("Dimensions");

QUnit.test("$.fn.offsetParent", function (assert) {
	var test = document.getElementsByClassName("test")[0];

	test.innerHTML = '<div class="testtemp" style="position:relative;"><div class="testinner"><div class="testinner2"></div></div></div>';

	assert.deepEqual($(".testinner").offsetParent().get(0), test.getElementsByClassName("testinner")[0].offsetParent, "Can get offset parent");
	assert.deepEqual($(".testinner2").offsetParent().get(0), test.getElementsByClassName("testinner2")[0].offsetParent, "Can get offset parent");
});
