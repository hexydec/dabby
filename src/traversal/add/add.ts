import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import type {} from "../../modular.js";

function add(this: Dabby, selector: Selector): Dabby {
	// Get existing nodes
	const existing = Array.from(this);

	// Get new nodes
	const newNodes = Array.from($(selector));

	// Combine and filter duplicates
	const combined = [...existing, ...newNodes].filter(
		(node, index, self) => self.indexOf(node) === index
	);

	return $(combined);
}

Object.defineProperty(Dabby.prototype, "add", { value: add, configurable: true });
