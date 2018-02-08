QUnit.module("Ajax");

QUnit.test("$.fn.load", function (assert) {
	assert.expect(12);
	var done = assert.async(2);

	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div>';
	obj = $(".testtemp, .testtemp2");

	// load HTML
	obj.load("../tests/assets/sample.html", function (response, status) {
		assert.equal(status, 200, "Can make an AJAX request");
		assert.ok(response.indexOf("Sample HTML File") !== -1, "AJAX request returned correct file");
		assert.equal($("p", this).get(0).innerText, "Sample HTML File", "HTML was successfully inserted into the page");
		if (this.matches(".testtemp2")) { // only done() when run on both
			done();
		}
	});

	// load HTML with selector
	obj.load("../tests/assets/sample.html .test", function (response, status) {
		assert.equal(status, 200, "Can make an AJAX request");
		assert.ok(response.indexOf("Sample HTML File") !== -1, "AJAX request returned correct file");
		assert.equal($(".test", this).get(0).innerText, "This is inside a selector", "HTML was successfully inserted into the page");
		if (this.matches(".testtemp2")) { // only done() when run on both
			done();
		}
	});
});
