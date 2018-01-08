QUnit.module("Events");

QUnit.test("$.fn.trigger", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"><div></div><div></div><div></div></div>';

	var divs = test.getElementsByTagName("div"),
		count = 0,
		dabbyDivs = $(".testtemp div");

	[].slice.call(divs).forEach(function (div) {
		div.onclick = function () {count++;};
	});

	// test
	assert.equal(dabbyDivs.trigger("click"), dabbyDivs, "Returns self on trigger");
	assert.equal(count, 3, "Can trigger events");
});
