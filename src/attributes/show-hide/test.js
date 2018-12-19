import $ from "../../../dist/dabby.js";

QUnit.module("Attributes", hooks => {

	QUnit.test("$.fn.show", function (assert) {
		var test = document.getElementsByClassName("test")[0],
			obj;
		test.innerHTML = '<div class="testtemp"><div style="display: none;"></div><div style="display: none;"></div><div style="display: none;"><div style="display: none;"></div></div><div style="display: none;"><div style="display: none;"></div></div></div>';
		obj = $(".testtemp div");

		assert.deepEqual(obj.show(), obj, "Returns self on set");
		let show = 0;
		obj.get().forEach(item => {
			show += item.style.display !== "none";
		});
		assert.equal(obj.length, show, "Showed the requested elements");
	});

	QUnit.test("$.fn.hide", function (assert) {
		var test = document.getElementsByClassName("test")[0],
			obj;
		test.innerHTML = '<div class="testtemp"><div></div><div></div><div><div></div></div><div><div></div></div></div>';
		obj = $(".testtemp div");

		assert.deepEqual(obj.hide(), obj, "Returns self on set");
		let hide = 0;
		obj.get().forEach(item => {
			hide += item.style.display === "none";
		});
		assert.equal(obj.length, hide, "Hid the requested elements");
	});

	QUnit.test("$.fn.toggle", function (assert) {
		var test = document.getElementsByClassName("test")[0],
			obj;
		test.innerHTML = '<div class="testtemp"><div style="display: none;"></div><div style="display: inline-block;"></div><div style="display: flex;"><div></div></div><div style="display: none;"><div style="display: none;"></div></div></div>';
		obj = $(".testtemp div");

		assert.deepEqual(obj.toggle(), obj, "Returns self on set");
		let show = 0, hide = 0;
		obj.get().forEach(item => {
			hide += item.style.display === "none";
			show += item.style.display !== "none";
		});
		assert.equal(3, show, "Showed the requested elements");
		assert.equal(3, hide, "Hid the requested elements");
	});
});
