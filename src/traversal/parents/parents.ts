import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import type {} from "../../modular.js";
import filterNodes from "../../internal/filternodes/filternodes.js";
import type {} from "../../modular.js";

function factory(
	obj: Dabby,
	selector?: Selector,
	filter?: Selector | null,
	single?: boolean,
	until?: boolean
): Dabby {
	const nodes: Element[] = [];
	let i = obj.length;

	while (i--) {
		let parent: Node | null = (obj[i] as Element).parentNode;
		while (parent && parent.nodeType === 1) { // Node.ELEMENT_NODE
			if (until && filterNodes(parent as Element, selector!).length) {
				break;
			}
			nodes.push(parent as Element);
			if (single) {
				break;
			}
			parent = parent.parentNode;
		}
	}
	if (!until) {
		filter = selector;
	}
	return $(filter ? filterNodes($(nodes), filter) as Element[] : nodes);
}

function parent(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector, null, true);
}

Object.defineProperty(Dabby.prototype, "parent", { value: parent, configurable: true });

function parents(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector);
}

Object.defineProperty(Dabby.prototype, "parents", { value: parents, configurable: true });

function until(this: Dabby, selector: Selector, filter?: Selector): Dabby {
	return factory(this, selector, filter, false, true);
}

Object.defineProperty(Dabby.prototype, "parentsUntil", { value: until, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    parent: typeof parent;
    parents: typeof parents;
    parentsUntil: typeof until;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __parent = typeof parent;
export type __parents = typeof parents;
export type __parentsUntil = typeof until;

