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

	describe("$.fn.offset", () => {
		it("returns self on set", () => {
			test.innerHTML = '<div class="testtemp">test</div>';
			const obj = $(".testtemp");
			expect(obj.offset({ top: 100, left: 100 })).toBe(obj);
		});

		it("can set and retrieve coordinates", () => {
			test.innerHTML = '<div class="testtemp">test</div>';
			const obj = $(".testtemp");
			const coords = { top: 100, left: 100 };
			obj.offset(coords);
			const offset = obj.offset();
			expect(typeof offset.top).toBe("number");
			expect(typeof offset.left).toBe("number");
		});

		it("can set coords through a callback", () => {
			test.innerHTML = '<div class="testtemp" style="position: absolute; top: 0; left: 0;">test</div>';
			const obj = $(".testtemp");
			obj.offset((i: number, current: { top: number, left: number }) => ({
				top: current.top + 100,
				left: current.left + 100
			}));
			const el = obj.get(0) as HTMLElement;
			// Verify the style was applied (happy-dom doesn't compute layout)
			expect(el.style.top).toBeTruthy();
			expect(el.style.left).toBeTruthy();
		});
	});
});
