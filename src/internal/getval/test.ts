import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";
import getVal from "./getval.js";

describe("Internal", () => {
	describe("getVal", () => {
		let test;

		beforeAll(() => {
			test = document.createElement("div");
			test.className = "test";
			document.body.appendChild(test);
			test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div><div class="testtemp3"></div>';
		});

		afterAll(() => {
			test.remove();
		});

		it("can pass-through a value", () => {
			const obj = $(".test div");
			expect(getVal(obj, "test")).toEqual(["test", "test", "test"]);
		});

		it("can use function as value", () => {
			const obj = $(".test div");
			expect(getVal(obj, function () { return $(this).attr("class"); })).toEqual(["testtemp", "testtemp2", "testtemp3"]);
		});

		it("can use function as value and return original value", () => {
			const obj = $(".test div");
			expect(getVal(obj, function (i, current) { return current; }, obj => obj.className)).toEqual(["testtemp", "testtemp2", "testtemp3"]);
		});

		it("clones objects onto each output", () => {
			const obj = $(".test div");
			let clone = { foo: "bar", bar: "foo" };
			const val = getVal(obj, clone);
			val.map((item, i) => {
				item.foo = "foo" + i;
				return item;
			});
			expect(val).toEqual([{ foo: "foo0", bar: "foo" }, { foo: "foo1", bar: "foo" }, { foo: "foo2", bar: "foo" }]);
			expect(clone).toEqual({ foo: "bar", bar: "foo" });
		});
	});
});
