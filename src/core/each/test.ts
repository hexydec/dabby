import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Core", () => {
	let test;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
		test.innerHTML = '<span class="item1">one</span><span class="item2">two</span>';
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.each", () => {
		it("iterates over all elements", () => {
			const output = [];
			$(".test span").each(function () {
				output.push(this.textContent);
			});
			expect(output).toEqual(["one", "two"]);
		});

		it("provides correct index", () => {
			const indices = [];
			$(".test span").each(function (i) {
				indices.push(i);
			});
			expect(indices).toEqual([0, 1]);
		});

		it("binds this to the current element", () => {
			$(".test span").each(function (i) {
				expect(this).toBe($(".test span").get(i));
			});
		});

		it("returns the Dabby object for chaining", () => {
			const obj = $(".test span");
			expect(obj.each(() => {})).toBe(obj);
		});

		it("can break iteration by returning false", () => {
			const output = [];
			$(".test span").each(function () {
				output.push(this.textContent);
				return false;
			});
			expect(output).toEqual(["one"]);
		});
	});
});
