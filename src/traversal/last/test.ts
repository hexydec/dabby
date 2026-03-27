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

	describe("$.fn.last", () => {
		it("returns last element of collection", () => {
			test.innerHTML = '<div class="testtemp"><div class="class1">first</div><div class="class1">second</div></div>';
			expect($(".testtemp .class1").last().get(0).textContent).toBe("second");
		});

		it("returns collection of length 1", () => {
			test.innerHTML = '<div>a</div><div>b</div>';
			expect($(".test div").last().length).toBe(1);
		});

		it("returns empty for empty collection", () => {
			expect($(".nonexistent").last().length).toBe(0);
		});
	});
});
