import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Ajax", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.serialize", () => {
		it("can serialize a form", () => {
			test.innerHTML = '<form class="testtemp">' +
				'<input type="input" name="input" value="input" />' +
				'<input type="number" name="number" value="42" />' +
				'<input type="email" name="email" value="dave@angel.com" />' +
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

			const result = $(".testtemp").serialize();
			expect(result).toContain("input=input");
			expect(result).toContain("number=42");
			expect(result).toContain("email=dave%40angel.com");
			expect(result).toContain("checkbox-checked=checked");
			expect(result).not.toContain("checkbox=unchecked");
			expect(result).toContain("radio=radio2");
			expect(result).toContain("select=select2");
		});
	});
});
