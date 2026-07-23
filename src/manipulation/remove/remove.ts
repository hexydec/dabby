import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { Selector } from "../../types.js";
import filterNodes from "../../internal/filternodes/filternodes.js";

const factory = (obj: Dabby, selector: Selector | undefined, remove: boolean): Dabby => {
	let i = obj.length;
	const nodes: Element[] = [];

	// Detach selected nodes
	while (i--) {
		const element = obj[i] as Element;
		if (!selector || filterNodes(element, selector).length) {
			// Remove data from removed nodes
			if (remove && ($ as unknown as { fn: { off?: () => void } }).fn.off) {
				($(element) as Dabby & { off: () => void }).off();
			}
			// Only remove if attached to something
			nodes.push(element.parentNode ? element.parentNode.removeChild(element) as Element : element);
		}
	}

	// Create a new Dabby object to return
	return remove ? obj : $(nodes);
};

/**
 * Detach some or all of the items in the collection from the DOM.
 *
 * Behaves like `.remove()` but preserves any data and bound event handlers,
 * so the detached nodes can be reinserted later without losing state.
 *
 * @param selector - optional filter; when supplied, only items that match are detached
 * @returns a new Dabby collection containing the detached nodes
 *
 * @example
 * const $rows = $("tr").detach(".selected");
 * $(".other-table tbody").append($rows);
 */
function detach(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector, false);
}

Object.defineProperty(Dabby.prototype, "detach", { value: detach, configurable: true });

/**
 * Remove some or all of the items in the collection from the DOM.
 *
 * Each removed element has its bound event handlers torn down via `.off()`
 * before being detached from its parent, so any associated data and listeners
 * are released.
 *
 * @param selector - optional filter; when supplied, only items that match are removed
 * @returns the original Dabby collection
 *
 * @example
 * $(".todo-item").remove(".completed");
 */
function remove(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector, true);
}

Object.defineProperty(Dabby.prototype, "remove", { value: remove, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    detach(selector?: Selector): this;
    remove(selector?: Selector): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __detach = typeof detach;
export type __remove = typeof remove;

