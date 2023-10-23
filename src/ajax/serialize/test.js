import $ from "../../../dist/dabby.js";

QUnit.module("Ajax", function (hooks) {

	QUnit.test("$.serialize", function (assert) {
		var test = document.getElementsByClassName("test")[0];
		test.innerHTML = '<form class="testtemp">' +
			'<input type="input" name="input" value="input" />' +
			'<input type="number" name="number" value="42" />' +
			'<input type="email" name="email" value="dave@angel.com" />' +
			'<input type="datetime-local" name="datetime" value="1999-12-31 23:59:59" />' +
			'<input type="submit" name="submit" value="" />' +

			'<input type="checkbox" name="checkbox" value="unchecked" />' +
			'<input type="checkbox" name="checkbox-checked" value="checked" checked="checked" />' +

			'<input type="input" name="in[]" value="input1" />' +
			'<input type="input" name="in[]" value="input2" />' +
			'<input type="input" name="in[]" value="input3" />' +

			'<input type="radio" name="radio" value="radio1" />' +
			'<input type="radio" name="radio" value="radio2" checked="checked" />' +
			'<input type="radio" name="radio" value="radio3" />' +

			'<select name="select">' +
				'<option value="select1">Option 1</option>' +
				'<option value="select2" selected="selected">Option 2</option>' +
				'<option value="select3">Option 3</option>' +
			'</select>' +

			'<select name="multiselect[]" multiple="multiple">' +
				'<option value="select1">Option 1</option>' +
				'<option value="select2" selected="selected">Option 2</option>' +
				'<option value="select3" selected="selected">Option 3</option>' +
			'</select>' +
		'</form>';
		var date = test.querySelector("input[name=datetime]").value;
		assert.equal($(".testtemp").serialize(), "input=input&number=42&email=dave%40angel.com&datetime="+encodeURIComponent(date)+"&checkbox-checked=checked&in%5B%5D=input1&in%5B%5D=input2&in%5B%5D=input3&radio=radio2&select=select2&multiselect%5B%5D=select2&multiselect%5B%5D=select3", "Can serialize a form");
	});
});