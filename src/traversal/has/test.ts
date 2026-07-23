import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Traversal", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.has", () => {
		it("can filter nodes based on children", () => {
			test.innerHTML = '<div class="testtemp1"><div class="testtemp1-inner">test</div></div><div class="testtemp2"><div class="testtemp2-inner">test</div></div>';
			const obj = $(".test > div");
			expect(obj.has(".testtemp1-inner").get()).toEqual([obj.get(0)]);
			expect(obj.has(".testtemp2-inner").get()).toEqual([obj.get(1)]);
		});

		it("returns empty when no children match", () => {
			test.innerHTML = '<div class="testtemp1"><div>test</div></div>';
			expect($(".test > div").has(".nonexistent").get()).toEqual([]);
		});
	});
});
