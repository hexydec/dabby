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

		var list = $('<div class="second"></div><div class="third"></div><div class="forth"></div>');
		main.prepend(list);
		assert.equal('<div class="second"></div><div class="third"></div><div class="forth"></div><div>Prepend</div><div class="first">First</div>', main.html(), "Can prepend multiple nodes in the right order");

		var copy = $(".testtemp .forth");
		$(".testtemp .second, .testtemp .third").prepend(copy);
		assert.equal('<div class="second"><div class="forth"></div></div><div class="third"><div class="forth"></div></div><div>Prepend</div><div class="first">First</div>', main.html(), "Objects are cloned and moved correctly on prepend");

		var same = [];
		$(".testtemp .forth").each(function (i) {
			same.push(this.isSameNode(copy[0]));
		});
		assert.deepEqual([false, true], same, "The correct nodes were cloned or moved");
	});

	QUnit.test("$.fn.append", function (assert) {
		var main = $(".testtemp");

		assert.deepEqual(main.append("<div>Append</div>"), main, "Returns itself on append");
		assert.equal(main.html(), '<div class="first">First</div><div>Append</div>', "Can append html");

		var list = $('<div class="second"></div><div class="third"></div><div class="forth"></div>');
		main.append(list);
		assert.equal('<div class="first">First</div><div>Append</div><div class="second"></div><div class="third"></div><div class="forth"></div>', main.html(), "Can prepend multiple nodes in the right order");

		var copy = $(".testtemp .forth");
		$(".testtemp .first, .testtemp .second").append(copy);
		assert.equal('<div class="first">First<div class="forth"></div></div><div>Append</div><div class="second"><div class="forth"></div></div><div class="third"></div>', main.html(), "Objects are cloned and moved correctly on prepend");

		var same = [];
		$(".testtemp .forth").each(function (i) {
			same.push(this.isSameNode(copy[0]));
		});
		assert.deepEqual([false, true], same, "The correct nodes were cloned or moved");
	});

	QUnit.test("$.fn.before", function (assert) {
		var main = $(".testtemp"),
			inner = $(".testtemp .first");

		assert.deepEqual(inner.before('<div class="before">Before</div>'), inner, "Returns itself on before");
		assert.equal('<div class="before">Before</div><div class="first">First</div>', main.html(), "Can insert html before");

		$(".testtemp .before").before(inner);
		assert.equal('<div class="first">First</div><div class="before">Before</div>', main.html(), "Can move html with before");

		inner.before('<div class="copy">Copy/Clone</div>');
		assert.equal('<div class="copy">Copy/Clone</div><div class="first">First</div><div class="before">Before</div>', main.html(), "Can insert html before");

		$(".testtemp div").before('<div class="another">Another</div>', '<div class="another2">Another</div>');
		assert.equal('<div class="another">Another</div><div class="another2">Another</div><div class="copy">Copy/Clone</div><div class="another">Another</div><div class="another2">Another</div><div class="first">First</div><div class="another">Another</div><div class="another2">Another</div><div class="before">Before</div>', main.html(), "Can insert multiple nodes before");

		var copy = $(".testtemp .copy");
		$(".testtemp .another").before(copy);
		assert.equal('<div class="copy">Copy/Clone</div><div class="another">Another</div><div class="another2">Another</div><div class="copy">Copy/Clone</div><div class="another">Another</div><div class="another2">Another</div><div class="first">First</div><div class="copy">Copy/Clone</div><div class="another">Another</div><div class="another2">Another</div><div class="before">Before</div>', main.html(), "Objects are cloned and moved correctly on before");

		var same = [];
		$(".testtemp .copy").each(function (i) {
			same.push(this.isSameNode(copy[0]));
		});
		assert.deepEqual([false, false, true], same, "The correct nodes were cloned or moved");
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
