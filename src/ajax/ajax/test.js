import $ from "../../../dist/dabby.js";

QUnit.module("Ajax", function (hooks) {
	
	QUnit.test("$.ajax", function (assert) {
		assert.expect(17);
		var done = assert.async(8);
		$.ajax("../tests/assets/sample.html", {success: function (response, status) {
			assert.equal(status, "success", "Can make an AJAX request");
			assert.ok(response.indexOf("Sample HTML File") !== -1, "AJAX request returned correct file");
			done();
		}});
		$.ajax({
			url: "../tests/assets/sample.html",
			success: function (response, status) {
				assert.equal(status, "success", "Can make an AJAX request with all settings as object");
				assert.ok(response.indexOf("Sample HTML File") !== -1, "AJAX request returned correct file");
				done();
			},
			complete: function (xhr, status) {
				assert.equal(status, "success", "Can set complete callback");
				assert.ok(xhr.responseText.indexOf("Sample HTML File") !== -1, "Complete callback returned correct file");
				done();
			},
			statusCode: {
				200: function (response, status) {
					assert.equal(status, "success", "Can set statusCode 200 callback");
					assert.ok(response.indexOf("Sample HTML File") !== -1, "Status code 200 callback returned correct file");
					done();
				}
			}
		});
		$.ajax("../tests/assets/sample.json", {success: function (response, status) {
			assert.equal(status, "success", "Can make an AJAX request");
			assert.equal(response.foo, "foo", "AJAX request returned json");
			done();
		}});
		$.ajax("../tests/assets/404.html", {error: function (response, status) {
			assert.equal(status, "error", "Can run callback on error");
			done();
		}});

		// syncronous
		$.ajax("../tests/assets/sample.js", {success: function (response, status) {
			assert.equal(status, "success", "Can include a javascript file");
			assert.ok(dabbyScriptSuccess, "Javascript file included successfully");
			done();
		}});

		$.ajax("../tests/assets/sample.js?v=1.0.0", {success: function (response, status) {
			assert.equal(status, "success", "Can include a javascript file");
			assert.ok(dabbyScriptSuccess, "Javascript file included successfully");
			done();
		}});

		var action = $("impossible").attr("action");
		$.ajax(action, {success: function (response, status) {
			assert.equal(status, "success", "Can fetch file when settings.url not set");
			assert.ok(response.indexOf("<title>Dabby.js Test Page</title>") > -1, "Current URL is fetched when settings.url is not set");
		}});

		// jsonp
		/*$.ajax("../tests/assets/jsonp.js", {dataType: "jsonp", success: function (response, status) {
			assert.equal(status, "success", "Can include a javascript file via JSONP");
			assert.ok(response, "JSONP response correct");
			done();
		}});*/
	});
});