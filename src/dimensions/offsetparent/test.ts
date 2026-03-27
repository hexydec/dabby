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

	describe("$.fn.offsetParent", () => {
		it("can get offset parent", () => {
			test.innerHTML = '<div class="testtemp" style="position:relative;"><div class="testinner"><div class="testinner2"></div></div></div>';
			const inner = test.querySelector(".testinner") as HTMLElement;
			expect($(".testinner").offsetParent().get(0)).toBe(inner.offsetParent);
		});

		it("returns a Dabby object", () => {
			test.innerHTML = '<div class="testtemp" style="position:relative;"><div class="testinner"></div></div>';
			const result = $(".testinner").offsetParent();
			expect(result.get).toBeDefined();
		});
	});
});
