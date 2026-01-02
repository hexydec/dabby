import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import type {} from "../../modular.js";
import filterNodes from "../../internal/filternodes/filternodes.js";
import type {} from "../../modular.js";

const factory = (obj: Dabby, selector: Selector | undefined, remove: boolean): Dabby => {
	let i = obj.length;
	const nodes: Element[] = [];

	// Detach selected nodes
	while (i--) {
		const element = obj[i] as Element;
		if (!selector || filterNodes(element, selector).length) {
			// Remove data from removed nodes
			if (remove && ($ as { fn: { off?: () => void } }).fn.off) {
				$(element).off?.();
			}
			// Only remove if attached to something
			nodes.push(element.parentNode ? element.parentNode.removeChild(element) as Element : element);
		}
	}

	// Create a new Dabby object to return
	return remove ? obj : $(nodes);
};

function detach(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector, false);
}

Object.defineProperty(Dabby.prototype, "detach", { value: detach, configurable: true });

function remove(this: Dabby, selector?: Selector): Dabby {
	return factory(this, selector, true);
}

Object.defineProperty(Dabby.prototype, "remove", { value: remove, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    detach(selector?: Selector): this;
    remove(selector?: Selector): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __detach = typeof detach;
export type __remove = typeof remove;

