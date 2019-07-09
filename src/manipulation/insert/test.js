import $ from "../../../dist/dabby.js";

QUnit.module("Manipulation", function (hooks) {
	var test = document.getElementsByClassName("test")[0];

	hooks.beforeEach(() => {
		test.innerHTML = '<div class="testtemp"><div class="first">First</div></div>';
	});

	QUnit.test("$.fn.prepend", function (assert) {
		var main = $(".testtemp");

		assert.deepEqual(main.prepend("<div>Prepend</div>"), main, "Returns itself on prepend");
		assert.equal(main.html(), '<div>Prepend</div><div class="first">First</div>', "Can prepend html");
	});

	QUnit.test("$.fn.append", function (assert) {
		var main = $(".testtemp");

		assert.deepEqual(main.append("<div>Append</div>"), main, "Returns itself on append");
		assert.equal(main.html(), '<div class="first">First</div><div>Append</div>', "Can append html");
	});

	QUnit.test("$.fn.before", function (assert) {
		var main = $(".testtemp"),
			inner = $(".testtemp .first");

		assert.deepEqual(inner.before("<div>Before</div>"), inner, "Returns itself on before");
		assert.equal(main.html(), '<div>Before</div><div class="first">First</div>', "Can insert html before");
	});

	QUnit.test("$.fn.after", function (assert) {
		var main = $(".testtemp"),
			inner = $(".testtemp .first");

		assert.deepEqual(inner.after('<div class="after">After</div>'), inner, "Returns itself on after");
		assert.equal('<div class="first">First</div><div class="after">After</div>', main.html(), "Can insert html after");

		$(".testtemp .after").after(inner);
		assert.equal('<div class="after">After</div><div class="first">First</div>', main.html(), "Can move html with after");

		inner.after('<div class="copy">Copy/Clone</div>');
		assert.equal('<div class="after">After</div><div class="first">First</div><div class="copy">Copy/Clone</div>', main.html(), "Can insert html after");

		$(".testtemp div").after('<div class="another">Another</div>', '<div class="another2">Another</div>');
		assert.equal('<div class="after">After</div><div class="another">Another</div><div class="another2">Another</div><div class="first">First</div><div class="another">Another</div><div class="another2">Another</div><div class="copy">Copy/Clone</div><div class="another">Another</div><div class="another2">Another</div>', main.html(), "Can insert html after");

		var copy = $(".testtemp .copy");
		$(".testtemp .another").after(copy);
		assert.equal('<div class="after">After</div><div class="another">Another</div><div class="copy">Copy/Clone</div><div class="another2">Another</div><div class="first">First</div><div class="another">Another</div><div class="copy">Copy/Clone</div><div class="another2">Another</div><div class="another">Another</div><div class="copy">Copy/Clone</div><div class="another2">Another</div>', main.html(), "Objects are cloned and moved correctly on after");

		var same = [];
		$(".testtemp .copy").each(function (i) {
			same.push(this.isSameNode(copy[0]));
		});
		assert.deepEqual([false, false, true], same, "The correct nodes were cloned or moved");
	});

	hooks.after(() => {
		test.innerHTML = "";
	});
});
