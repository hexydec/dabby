import $ from "../../../dist/dabby.js";

QUnit.module("Traversal", function (hooks) {
	var test = document.getElementsByClassName("test")[0];

	hooks.before(() => {
		test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div><div class="testtemp3">test 3</div><div class="testtemp4">test 4</div>';
	});

	QUnit.test("$.fn.next", function (assert) {
		const obj = $(".testtemp"),
			next = $(".testtemp2").get(0);

		assert.deepEqual(next, obj.next().get(0), "Can find next element");
		assert.deepEqual(next, obj.next(".testtemp2").get(0), "Can find next element when matching a selector");
		assert.equal(0, obj.next(".testtemp3").length, "Fails when selector doesn't match");

		assert.deepEqual($(".testtemp2, .testtemp3, .testtemp4").get(), obj.nextAll().get(), "Returns true when node matches selector");
	});

	QUnit.test("$.fn.nextUntil", function (assert) {
		const obj = $(".testtemp");
		assert.deepEqual($(".testtemp2, .testtemp3").get(), obj.nextUntil(".testtemp4").get(), "Can find next element until");
		assert.deepEqual($(".testtemp2").get(), obj.nextUntil(".testtemp4", ".testtemp2").get(), "Can find next element until");
	});

	QUnit.test("$.fn.nextAll", function (assert) {
		const obj = $(".testtemp");
		assert.deepEqual($(".testtemp2, .testtemp3, .testtemp4").get(), obj.nextAll().get(), "Can find all next elements");
		assert.deepEqual($(".testtemp3").get(), obj.nextAll(".testtemp, .testtemp3").get(), "Can find all next elements filtered by a selector");
	});

	QUnit.test("$.fn.prev", function (assert) {
		const obj = $(".testtemp4"),
			prev = $(".testtemp3").get(0);

		assert.deepEqual(prev, obj.prev().get(0), "Can find previous element");
		assert.deepEqual(prev, obj.prev(".testtemp3").get(0), "Can find previous element when matching a selector");
		assert.equal(0, obj.prev(".testtemp").length, "Fails when selector doesn't match");
	});

	QUnit.test("$.fn.prevUntil", function (assert) {
		const obj = $(".testtemp4");
		assert.deepEqual($(".testtemp3").add(".testtemp2").get(), obj.prevUntil(".testtemp").get(), "Can find prev element until");
		assert.deepEqual($(".testtemp2").get(), obj.prevUntil(".testtemp4", ".testtemp2").get(), "Can find prev element until");
	});

	QUnit.test("$.fn.prevAll", function (assert) {
		const obj = $(".testtemp4");
		assert.deepEqual($(".testtemp3").add(".testtemp2").add(".testtemp").get(), obj.prevAll().get(), "Can find all prev elements");
		assert.deepEqual($(".testtemp3").get(), obj.prevAll(".testtemp4, .testtemp3").get(), "Can find all prev elements filtered by a selector");
	});

	hooks.after(() => {
		test.innerHTML = "";
	});
});
