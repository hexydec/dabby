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

	describe("$.fn.filter", () => {
		it("can filter nodes by selector", () => {
			test.innerHTML = '<div class="testtemp testtemp1">test</div><div class="testtemp testtemp2">test 2</div><div class="testtemp testtemp3">test 3</div>';
			const obj = $(".testtemp");
			expect(obj.filter(".testtemp2").get()).toEqual($(".testtemp2").get());
		});

		it("can filter by callback with element argument", () => {
			test.innerHTML = '<div class="testtemp">test</div><div class="testtemp">test 2</div>';
			const obj = $(".testtemp");
			expect(obj.filter(function (i: number, item: Element) { return item.innerHTML == "test"; }).get(0).innerHTML).toBe("test");
		});

		it("can filter by callback with this binding", () => {
			test.innerHTML = '<div class="testtemp">test</div><div class="testtemp">other</div>';
			const obj = $(".testtemp");
			expect(obj.filter(function () { return this.innerHTML != "test"; }).get().length).toBe(1);
		});
	});

	describe("$.fn.not", () => {
		it("can negatively filter by selector", () => {
			test.innerHTML = '<div class="testtemp testtemp1">test</div><div class="testtemp testtemp2">test 2</div><div class="testtemp testtemp3">test 3</div>';
			const obj = $(".testtemp");
			expect(obj.not(".testtemp2").get()).toEqual($(".testtemp1,.testtemp3").get());
		});

		it("can negatively filter by callback", () => {
			test.innerHTML = '<div class="testtemp">test</div><div class="testtemp">test 2</div><div class="testtemp">test 3</div>';
			const obj = $(".testtemp");
			expect(obj.not(function (i: number, item: Element) { return item.innerHTML != "test"; }).get(0).innerHTML).toBe("test");
		});
	});

	describe("$.fn.is", () => {
		it("returns true when node matches selector", () => {
			test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
			const obj = $(".testtemp, .testtemp2");
			expect(obj.is(".testtemp")).toBe(true);
		});

		it("returns true when node matches element", () => {
			test.innerHTML = '<div class="testtemp">test</div>';
			const obj = $(".testtemp");
			expect(obj.is(document.querySelector(".testtemp")!)).toBe(true);
		});

		it("returns true when node matches Dabby collection", () => {
			test.innerHTML = '<div class="testtemp">test</div>';
			const obj = $(".testtemp");
			expect(obj.is($(".testtemp"))).toBe(true);
		});

		it("returns false for non-matching selector", () => {
			test.innerHTML = '<div class="testtemp">test</div>';
			expect($(".testtemp").is(".nonexistent")).toBe(false);
		});

		it("returns false for empty collection", () => {
			expect($(".nonexistent").is(".test")).toBe(false);
		});
	});
});
