import $ from "../../../dist/dabby.js";

QUnit.module("Events", function (hooks) {
	var test = document.getElementsByClassName("test")[0];

	hooks.before(function () {
		test.innerHTML = '<div class="testtemp"><div>1</div><div>2</div><div>3</div></div>';
	});

	QUnit.test("$.fn.trigger", function (assert) {
		var divs = test.querySelectorAll(".testtemp div"),
			count = 0,
			dabbyDivs = $(".testtemp div");

		[].slice.call(divs).forEach(function (div) {
			div.onclick = function (e) {
				count++;
				e.stopPropagation();
			};
		});

		// test
		assert.equal(dabbyDivs.trigger("click"), dabbyDivs, "Returns self on trigger");
		assert.equal(count, 3, "Can trigger events");
	});

	hooks.after(function () {
		test.innerHTML = "";
	});
});
