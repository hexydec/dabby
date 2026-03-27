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

	describe("$.fn.first", () => {
		it("returns first element of collection", () => {
			test.innerHTML = '<div class="testtemp"><div class="class1">first</div><div class="class1">second</div></div>';
			expect($(".testtemp div").first().get(0).textContent).toBe("first");
		});

		it("returns collection of length 1", () => {
			test.innerHTML = '<div>a</div><div>b</div>';
			expect($(".test div").first().length).toBe(1);
		});

		it("returns empty for empty collection", () => {
			expect($(".nonexistent").first().length).toBe(0);
		});
	});
});
