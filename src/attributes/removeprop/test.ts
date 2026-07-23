import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Attributes", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
		test.innerHTML = '<div class="testtemp"></div>';
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.removeProp", () => {
		it("can set and then remove a custom property", () => {
			const obj = $(".testtemp");
			obj.prop("custom", "value");
			expect(obj.prop("custom")).toBe("value");
			obj.removeProp("custom");
			expect(obj.prop("custom")).toBeUndefined();
		});

		it("returns self for chaining", () => {
			const obj = $(".testtemp");
			obj.prop("custom", "value");
			expect(obj.removeProp("custom")).toBe(obj);
		});
	});
});
