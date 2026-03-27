import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Utils", () => {
	describe("$.extend", () => {
		it("can shallow merge two objects", () => {
			expect($.extend({ foo: "foo" }, { bar: "bar" })).toEqual({ foo: "foo", bar: "bar" });
		});

		it("can overwrite properties", () => {
			expect($.extend({ foo: "foo", bar: "foo" }, { bar: "bar" })).toEqual({ foo: "foo", bar: "bar" });
		});

		it("can deep merge two objects", () => {
			expect($.extend(true, { deep: { foo: "foo", bar: "foo" } }, { deep: { bar: "bar" } })).toEqual({ deep: { foo: "foo", bar: "bar" } });
		});

		it("can deep merge three objects", () => {
			expect($.extend(
				true,
				{ deep: { foo: "foo", bar: "foo" } },
				{ deep: { bar: "bar" } },
				{ deep: { foobar: "foobar" } }
			)).toEqual({ deep: { foo: "foo", bar: "bar", foobar: "foobar" } });
		});

		it("can deep merge complex nested structures", () => {
			expect($.extend(
				true,
				{
					foo: "foo",
					bar: "foo",
					deep: {
						value1: false,
						value2: "no",
						value3: { value: "foo" },
						arr: [1, 2]
					}
				}, {
					bar: { value: "bar" },
					deep: {
						value1: true,
						value2: "yes",
						value3: { value: "bar", value2: "foo" },
						arr: [3, 4]
					}
				}
			)).toEqual({
				foo: "foo",
				bar: { value: "bar" },
				deep: {
					value1: true,
					value2: "yes",
					value3: { value: "bar", value2: "foo" },
					arr: [3, 4]
				}
			});
		});

		it("handles array/object type switching in deep merge", () => {
			expect($.extend(
				true,
				{ arr: { not: "arr" }, obj: ["is", "array"] },
				{ arr: ["is", "arr"], obj: { is: "obj" } }
			)).toEqual({ arr: ["is", "arr"], obj: { is: "obj" } });
		});

		it("single-arg extend merges onto new object with $ properties", () => {
			const result = $.extend({ testProp: "hello" }) as any;
			expect(result.testProp).toBe("hello");
			expect(typeof result).toBe("object");
		});
	});
});
