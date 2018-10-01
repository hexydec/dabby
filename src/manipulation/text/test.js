import {$} from "../../../dist/dabby.js";

QUnit.module("Manipulation");

QUnit.test("$.fn.text", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp">This <strong>is</strong> a <span><span><span>test yo</span></span></span></div>';
	var obj = $(".testtemp");

	assert.equal(obj.text(), "This is a test yo", "Can retrieve text");
	assert.deepEqual(obj.text("This is a test yo"), obj, "Returns self on set text");
	assert.equal(obj.get(0).textContent, "This is a test yo", "Can set text");
});
