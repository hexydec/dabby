import $ from "../../../dist/dabby.js";

QUnit.module("Ajax", function (hooks) {
	var test = document.getElementsByClassName("test")[0];

	hooks.before(() => {
		test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div>';
	});

	QUnit.test("$.fn.load", function (assert) {
		assert.expect(17);
		var done = assert.async(3);

		var obj = $(".testtemp, .testtemp2");

		// load HTML
		obj.load("../tests/assets/sample.html", function (response, status) {
			assert.equal(status, "success", "Can make an AJAX request");
			assert.ok(response.indexOf("Sample HTML File") !== -1, "AJAX request returned correct file");
			assert.equal($("p", this).get(0).innerText, "Sample HTML File", "HTML was successfully inserted into the page");
			if (this.matches(".testtemp2")) { // only done() when run on both
				done();
			}
		});

		// load HTML with selector
		obj.load("../tests/assets/sample.html .test", function (response, status) {
			assert.equal(status, "success", "Can make an AJAX request");
			assert.ok(response.indexOf("Sample HTML File") !== -1, "AJAX request returned correct file");
			assert.equal($(".test", this).get(0).innerText, "This is inside a selector", "HTML was successfully inserted into the page");
			if (this.matches(".testtemp2")) { // only done() when run on both
				done();
			}
		});

		// load HTML with a script
		window.dabbyScriptSuccess = false;
		test.innerHTML = '<div class="testtemp"></div>';
		$(".testtemp").load("../tests/assets/sample-js.html", function (response, status) {
			assert.equal(status, "success", "Can make an AJAX request");
			assert.ok(response.indexOf("Sample HTML File with Javascript") !== -1, "AJAX request returned correct file");
			assert.equal($("h1", this).get(0).innerText, "Sample HTML File with Javascript", "HTML was successfully inserted into the page");
			assert.ok(window.dabbyInlineScriptSuccess, "Inline Script Executes");
			setTimeout(() => {
				assert.ok(window.dabbyScriptSuccess, "External Script Executed");
				done();
			}, 1000);
		});
	});

	hooks.after(() => {
		test.innerHTML = "";
	});
});