import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Traversal", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
		test.innerHTML = '<div class="testtemp"><div class="testtemp2"><div class="testtemp3">test</div></div></div>';
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.parent", () => {
		it("can select parent", () => {
			expect($(".testtemp3").parent().get()).toEqual($(".testtemp2").get());
		});

		it("can select parent with matching selector", () => {
			expect($(".testtemp3").parent(".testtemp2").get()).toEqual($(".testtemp2").get());
		});

		it("returns empty when parent doesn't match selector", () => {
			expect($(".testtemp3").parent(".testtemp").get()).toEqual([]);
		});
	});

	describe("$.fn.parents", () => {
		it("can select all parents", () => {
			const obj = $(".testtemp3");
			let parents: Element[] = [];
			let parent = obj.get(0) as Element;
			while (parent.parentNode && (parent.parentNode as Element).nodeType === Node.ELEMENT_NODE) {
				parents.push(parent.parentNode as Element);
				parent = parent.parentNode as Element;
			}
			expect(obj.parents().get()).toEqual(parents);
		});
	});

	describe("$.fn.parentsUntil", () => {
		it("can select parents until a selector", () => {
			const obj = $(".testtemp3");
			let parents: Element[] = [];
			let parent = obj.get(0) as Element;
			while (parent.parentNode && (parent.parentNode as Element).nodeType === Node.ELEMENT_NODE && (parent.parentNode as Element).className !== "test") {
				parents.push(parent.parentNode as Element);
				parent = parent.parentNode as Element;
			}
			expect(obj.parentsUntil(".test").get()).toEqual(parents);
		});
	});
});
