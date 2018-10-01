import {$} from "../../../dist/dabby.js";

QUnit.module("Utilities", function (hooks) {

	QUnit.test("$.isPlainObject", function (assert) {

		assert.equal($.isPlainObject(document.createElement('div')), false, "Host object is not plain");
		assert.equal($.isPlainObject(null), false, "NULL is not plain");
		assert.equal($.isPlainObject((function() {function Foo(){};return new Foo()}())), false, "Instance of other object is not plain");
		assert.equal($.isPlainObject(5), false, "Number primitive is not plain");
		assert.equal($.isPlainObject("dabby"), false, "String primitive is not plain");
		assert.equal($.isPlainObject(new Number(6)), false, "Number object is not plain");
		assert.equal($.isPlainObject({}), true, "Empty object is plain");
		assert.equal($.isPlainObject(new Object()), true, "New Object is plain");
		assert.equal($.isPlainObject(Object.create(null)), true, "Object created from null is plain");
	});
});
