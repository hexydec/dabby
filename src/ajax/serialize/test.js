QUnit.module("Ajax");

QUnit.test("$.serialize", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<form class="testtemp">' +
		'<input type="input" name="input" value="input" />' +
		'<input type="number" name="number" value="number" />' +
		'<input type="email" name="email" value="email" />' +
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

		'<select name="multiselect" multiple="multiple">' +
			'<option value="select1">Option 1</option>' +
			'<option value="select2" selected="selected">Option 2</option>' +
			'<option value="select3" selected="selected">Option 3</option>' +
		'</select>' +
	'</form>';

	assert.equal($(".testtemp").serialize(), "input=input&number=&email=email&datetime=1999-12-31%2023%3A59%3A59&checkbox-checked=checked&in%5B%5D=input3&radio=radio2&select=select2&multiselect%5B0%5D=select2&multiselect%5B1%5D=select3", "Can serialize a form");
});
