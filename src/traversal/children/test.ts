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

	describe("$.fn.children", () => {
		it("can get child nodes", () => {
			test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
			expect($(".test").children().get()).toEqual($(".testtemp, .testtemp2").get());
		});

		it("can get and filter child nodes", () => {
			test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
			expect($(".test").children(".testtemp").get()).toEqual($(".testtemp").get());
		});

		it("returns empty for element with no children", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			expect($(".testtemp").children().length).toBe(0);
		});

		it("only returns direct children, not descendants", () => {
			test.innerHTML = '<div class="parent"><div class="child"><div class="grandchild"></div></div></div>';
			expect($(".parent").children().length).toBe(1);
		});
	});
});
