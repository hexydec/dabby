import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Core", () => {
	let test;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$()", () => {
		it("can select element by class", () => {
			test.innerHTML = '<h1>test</h1>';
			expect($(".test").get(0)).toBe(test);
		});

		it("can select child element", () => {
			test.innerHTML = '<h1>test</h1>';
			const h1 = test.getElementsByTagName("h1")[0];
			expect($(".test h1").get(0)).toBe(h1);
		});

		it("can select direct child element", () => {
			test.innerHTML = '<h1>test</h1>';
			const h1 = test.getElementsByTagName("h1")[0];
			expect($(".test > h1").get(0)).toBe(h1);
		});

		it("can select with attribute selector and context", () => {
			test.innerHTML = '<input type="checkbox" checked="checked" />';
			const checkbox = test.querySelector("input[type=checkbox]");
			expect($("input[type=checkbox]", test).get(0)).toBe(checkbox);
		});

		it("can select from Dabby object", () => {
			expect($($(".test")).get(0)).toBe(test);
		});

		it("can select from DOM node", () => {
			expect($(test).get(0)).toBe(test);
		});

		it("can select from array of nodes", () => {
			test.innerHTML = '<h1>test</h1>';
			const h1 = test.getElementsByTagName("h1")[0];
			expect($([test, h1]).get()).toEqual([test, h1]);
		});

		it("can create HTML elements", () => {
			expect($('<h1>').get(0)).toBeInstanceOf(HTMLHeadingElement);
			expect($('<h1/>').get(0)).toBeInstanceOf(HTMLHeadingElement);
			expect($('<h1 />').get(0)).toBeInstanceOf(HTMLHeadingElement);
			expect($('<h1></h1>').get(0)).toBeInstanceOf(HTMLHeadingElement);
		});

		it("can create HTML element with attributes", () => {
			const obj = $("<h1>", {
				style: "background-color:red",
				text: "test",
			});
			const node = obj.get(0);
			expect(node).toBeInstanceOf(HTMLHeadingElement);
			expect(node.innerText).toBe("test");
			expect(node.style.backgroundColor).toBe("red");
		});

		it("can create HTML element with events", () => {
			let triggered = false;
			const obj = $("<h1>", {
				click: function () { triggered = true; }
			});
			obj.get(0).dispatchEvent(new MouseEvent("click", { view: window, bubbles: true, cancelable: true }));
			expect(triggered).toBe(true);
		});

		it("can create complex HTML nodes", () => {
			const html = '<h1>Hello <strong>How are you?</strong></h1>';
			expect($(html).get(0).outerHTML).toBe(html);
		});

		it("returns empty collection for non-existent selector", () => {
			expect($(".something-that-doesnt-exist").get()).toEqual([]);
		});

		it("returns empty collection for empty selector", () => {
			expect($().get()).toEqual([]);
		});

		it("can refine selection by multiple contexts", () => {
			test.innerHTML = '<table><tr><td>test 1</td></tr><tr><td>test 2</td></tr><tr><td>test 3</td></tr></table>';
			expect($("td", test.querySelectorAll("tr")).length).toBe(3);
			const obj = $("tr", test);
			expect($("td", obj).length).toBe(3);
		});

		it("supports iteration with for...of", () => {
			test.innerHTML = '<span>1</span><span>2</span>';
			const nodes = [];
			for (const node of $(".test span")) {
				nodes.push(node);
			}
			expect(nodes.length).toBe(2);
			expect(nodes[0].textContent).toBe("1");
		});

		it("has correct length property", () => {
			test.innerHTML = '<span>1</span><span>2</span><span>3</span>';
			expect($(".test span").length).toBe(3);
			expect($(".nonexistent").length).toBe(0);
		});
	});
});
