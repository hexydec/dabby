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

	describe("$.fn.add", () => {
		it("can add nodes to collection", () => {
			test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
			const obj = $(".testtemp");
			const newobj = obj.add(".testtemp2");
			expect(newobj.get()).toEqual($(".testtemp, .testtemp2").get());
		});

		it("does not modify original collection", () => {
			test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
			const obj = $(".testtemp");
			obj.add(".testtemp2");
			expect(obj.get()).toEqual($(".testtemp").get());
		});

		it("can add Dabby object", () => {
			test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
			const obj = $(".testtemp");
			const newobj = obj.add($(".testtemp2"));
			expect(newobj.length).toBe(2);
		});

		it("can add DOM node", () => {
			test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
			const obj = $(".testtemp");
			const newobj = obj.add(test.querySelector(".testtemp2")!);
			expect(newobj.length).toBe(2);
		});
	});
});
