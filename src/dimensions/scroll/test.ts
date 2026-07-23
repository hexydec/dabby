import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Dimensions", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.scrollLeft / $.fn.scrollTop", () => {
		it("returns self on set", () => {
			test.innerHTML = '<div class="testtemp" style="width:100px;height:100px;overflow:auto;"><div style="width:1000px;height:1000px;"></div></div>';
			const obj = $(".testtemp");
			expect(obj.scrollLeft(10)).toBe(obj);
		});

		it("can set and get scroll value", () => {
			test.innerHTML = '<div class="testtemp" style="width:100px;height:100px;overflow:auto;"><div style="width:1000px;height:1000px;"></div></div>';
			const obj = $(".testtemp");
			obj.scrollLeft(10);
			expect(Math.abs(obj.scrollLeft() - 10)).toBeLessThanOrEqual(1);
		});
	});
});
