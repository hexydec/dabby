import { describe, it, expect } from "vitest";
import camelise from "./camelise.js";

describe("Internal", () => {
	describe("camelise", () => {
		it("can camelCase a dashed sentence", () => {
			expect(camelise("this-is-a-test")).toBe("thisIsATest");
		});

		it("respects existing case", () => {
			expect(camelise("this-is-a-TEST")).toBe("thisIsATEST");
		});

		it("preserves CSS variable names", () => {
			expect(camelise("--css-variable-Camel-tESt")).toBe("--css-variable-Camel-tESt");
		});

		it("handles single word", () => {
			expect(camelise("test")).toBe("test");
		});

		it("handles empty string", () => {
			expect(camelise("")).toBe("");
		});

		it("handles single dash prefix", () => {
			expect(camelise("-webkit-transform")).toBe("WebkitTransform");
		});
	});
});
