import { describe, it, expect } from "vitest";
import dasherise from "./dasherise.js";

describe("Internal", () => {
	describe("dasherise", () => {
		it("can dasherise a camelCased sentence", () => {
			expect(dasherise("thisIsATest")).toBe("this-is-a-test");
		});

		it("dasherises each capital separately", () => {
			expect(dasherise("thisIsATEST")).toBe("this-is-a-t-e-s-t");
		});

		it("preserves CSS variable names", () => {
			expect(dasherise("--this-Is-A-TEST")).toBe("--this-Is-A-TEST");
		});

		it("handles single word", () => {
			expect(dasherise("test")).toBe("test");
		});

		it("handles empty string", () => {
			expect(dasherise("")).toBe("");
		});
	});
});
