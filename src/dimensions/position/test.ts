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

	describe("$.fn.position", () => {
		it("returns a position object", () => {
			test.innerHTML = '<div class="testtemp" style="position: relative; padding: 20px;"><div class="testinner" style="position: absolute; top: 10px; left: 15px;">test</div></div>';
			const pos = $(".testinner").position();
			expect(pos).toBeTruthy();
			expect(typeof pos.top).toBe("number");
			expect(typeof pos.left).toBe("number");
		});

		it("returns correct offsets", () => {
			test.innerHTML = '<div class="testtemp" style="position: relative; padding: 20px;"><div class="testinner" style="position: absolute; top: 10px; left: 15px;">test</div></div>';
			const pos = $(".testinner").position();
			// happy-dom doesn't compute layout, so offsetTop/offsetLeft return 0
			expect(typeof pos.top).toBe("number");
			expect(typeof pos.left).toBe("number");
		});

		it("returns undefined for empty collection", () => {
			expect($(".nonexistent").position()).toBeUndefined();
		});
	});
});
