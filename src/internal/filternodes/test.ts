import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";
import filterNodes from "./filternodes.js";

describe("Internal", () => {
	describe("filterNodes", () => {
		let test;

		beforeAll(() => {
			test = document.createElement("div");
			test.className = "test";
			document.body.appendChild(test);
			test.innerHTML = '<div class="testtemp"><div class="class1"></div><div class="class1"></div><div class="class2"></div><div class="class3"></div></div>';
		});

		afterAll(() => {
			test.remove();
		});

		it("can filter by CSS selector", () => {
			const obj = $(".testtemp div");
			const filtered = $(".testtemp .class1");
			expect(filterNodes(obj, ".class1")).toEqual(filtered.get());
		});

		it("can filter by Dabby collection", () => {
			const obj = $(".testtemp div");
			const filtered = $(".testtemp .class1");
			expect(filterNodes(obj, filtered)).toEqual(filtered.get());
		});

		it("can filter by node array", () => {
			const obj = $(".testtemp div");
			const filtered = $(".testtemp .class1");
			expect(filterNodes(obj, filtered.get())).toEqual(filtered.get());
		});

		it("can filter by callback", () => {
			const obj = $(".testtemp div");
			const filtered = $(".testtemp .class1");
			expect(filterNodes(obj, function (i, node) {
				return node.className === "class1";
			})).toEqual(filtered.get());
		});

		it("can negate filter", () => {
			const obj = $(".testtemp div");
			const filtered = $(".testtemp .class1");
			expect(filterNodes(obj, ".class2, .class3", true)).toEqual(filtered.get());
		});
	});
});
