import $ from "../../../dist/dabby.js";

QUnit.module("Events");

QUnit.test("$.fn named events", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div>';

	var main = $(".testtemp");
	var clicked = false;

	// Test .click() with callback (listen mode)
	main.click(function () {
		clicked = true;
	});

	// Test .click() without callback (trigger mode)
	main.click();
	assert.ok(clicked, "click() triggers bound handler");

	// Test chaining
	var result = main.click(function () {});
	assert.deepEqual(result.get(), main.get(), "Named event returns Dabby instance for chaining");

	// Test keydown
	var keyPressed = false;
	main.keydown(function () {
		keyPressed = true;
	});
	main.keydown();
	assert.ok(keyPressed, "keydown() triggers bound handler");

	// Test change
	var changed = false;
	main.change(function () {
		changed = true;
	});
	main.change();
	assert.ok(changed, "change() triggers bound handler");

	// Test mouseenter
	var entered = false;
	main.mouseenter(function () {
		entered = true;
	});
	main.mouseenter();
	assert.ok(entered, "mouseenter() triggers bound handler");

	test.innerHTML = "";
});
