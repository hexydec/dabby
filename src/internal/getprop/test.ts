import { describe, it, expect } from "vitest";
import getProp from "./getprop.js";

describe("Internal", () => {
	describe("getProp", () => {
		it("maps 'class' to 'className'", () => {
			expect(getProp("class")).toBe("className");
		});

		it("maps 'for' to 'htmlFor'", () => {
			expect(getProp("for")).toBe("htmlFor");
		});

		it("maps 'tabindex' to 'tabIndex'", () => {
			expect(getProp("tabindex")).toBe("tabIndex");
		});

		it("maps 'accesskey' to 'accessKey'", () => {
			expect(getProp("accesskey")).toBe("accessKey");
		});

		it("maps 'contenteditable' to 'contentEditable'", () => {
			expect(getProp("contenteditable")).toBe("contentEditable");
		});

		it("maps 'readonly' to 'readOnly'", () => {
			expect(getProp("readonly")).toBe("readOnly");
		});

		it("maps 'rowspan' to 'rowSpan'", () => {
			expect(getProp("rowspan")).toBe("rowSpan");
		});

		it("maps 'colspan' to 'colSpan'", () => {
			expect(getProp("colspan")).toBe("colSpan");
		});

		it("maps 'outerhtml' to 'outerHTML'", () => {
			expect(getProp("outerhtml")).toBe("outerHTML");
		});

		it("maps 'cellspacing' to 'cellSpacing'", () => {
			expect(getProp("cellspacing")).toBe("cellSpacing");
		});

		it("maps 'frameborder' to 'frameBorder'", () => {
			expect(getProp("frameborder")).toBe("frameBorder");
		});

		it("passes through unmapped properties as lowercase", () => {
			expect(getProp("id")).toBe("id");
			expect(getProp("title")).toBe("title");
		});
	});
});
