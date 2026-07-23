import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Attributes", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.val", () => {
		it("can read value from text input", () => {
			const obj = $("<input>", { type: "text", value: "test" });
			expect(obj.val()).toBe("test");
		});

		it("returns self when setting value", () => {
			const obj = $("<input>", { type: "text", value: "test" });
			expect(obj.val("new value")).toBe(obj);
		});

		it("can set value on text input", () => {
			const obj = $("<input>", { type: "text", value: "test" });
			obj.val("new value");
			expect(obj.val()).toBe("new value");
		});

		it("can set and read multiple select values", () => {
			const multi = document.createElement("select");
			multi.multiple = true;
			for (let i = 0; i < 10; i++) {
				const opt = document.createElement("option");
				opt.value = String(i);
				opt.innerHTML = String(i);
				multi.appendChild(opt);
			}
			const obj = $(multi).val([1, 3, 5]);
			expect(obj.val()).toEqual(["1", "3", "5"]);
		});

		it("can set and read value from textarea", () => {
			const text = $("<textarea>", { text: "test" });
			text.val("new value");
			expect(text.val()).toBe("new value");
		});

		it("can retrieve value of radio box", () => {
			const radio = $("<input>", { type: "radio", name: "radio", value: "radio1" }).add(
				$("<input>", { type: "radio", name: "radio", value: "radio2" })
			);
			expect(radio.val()).toBe("radio1");
		});

		it("can set value of radio box", () => {
			const radio = $("<input>", { type: "radio", name: "radio", value: "radio1" }).add(
				$("<input>", { type: "radio", name: "radio", value: "radio2" })
			);
			expect(radio.val(["radio2"])).toBe(radio);
			expect(radio.filter(":checked").val()).toBe("radio2");
		});

		it("can retrieve value of select box", () => {
			const select = $("<select>")
				.append($("<option>", { text: "Select item" }))
				.append($("<option>", { value: 1, text: "Item 1" }))
				.append($("<option>", { value: 2, text: "Item 2" }))
				.append($("<option>", { text: "3" }));
			expect(select.val()).toBe("Select item");
		});

		it("can set value of select box", () => {
			const select = $("<select>")
				.append($("<option>", { text: "Select item" }))
				.append($("<option>", { value: 1, text: "Item 1" }))
				.append($("<option>", { value: 2, text: "Item 2" }))
				.append($("<option>", { text: "3" }));
			select.val(2);
			expect(select.val()).toBe("2");
		});

		it("can set value of select box with no value attribute", () => {
			const select = $("<select>")
				.append($("<option>", { text: "Select item" }))
				.append($("<option>", { value: 1, text: "Item 1" }))
				.append($("<option>", { value: 2, text: "Item 2" }))
				.append($("<option>", { text: "3" }));
			select.val(3);
			expect(select.val()).toBe("3");
		});

		it("can set value from callback", () => {
			const select = $("<select>")
				.append($("<option>", { text: "Select item" }))
				.append($("<option>", { value: 1, text: "Item 1" }))
				.append($("<option>", { value: 2, text: "Item 2" }))
				.append($("<option>", { text: "3" }));
			select.val(2);
			select.val((i: number, current: string) => {
				return Number(current) - 1;
			});
			expect(select.val()).toBe("1");
		});
	});
});
