import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Manipulation", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.empty", () => {
		it("returns itself on empty", () => {
			test.innerHTML = '<div class="testtemp"><span>content</span></div>';
			const empty = $(".testtemp");
			expect(empty.empty()).toBe(empty);
		});

		it("can empty node", () => {
			test.innerHTML = '<div class="testtemp"><span>Empty</span></div>';
			const empty = $(".testtemp");
			empty.empty();
			expect(empty.get(0).innerHTML).toBe("");
		});

		it("works on already empty node", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			const empty = $(".testtemp");
			empty.empty();
			expect(empty.get(0).innerHTML).toBe("");
		});
	});
});
