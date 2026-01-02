import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import type { Selector } from "../../types.js";
import type {} from "../../modular.js";
import getVal from "../../internal/getval/getval.js";
import type {} from "../../modular.js";

type ReplaceCallback = (this: Element, index: number, html: string) => Selector;

function factory(obj: Dabby, html: Selector | ReplaceCallback, all: boolean): Dabby {
	const source = (all ? $(html as Selector) : obj).get();
	let target: Dabby | ReplaceCallback = (all ? obj : $(html as Selector)) as Dabby | ReplaceCallback;
	const isFunc = typeof target === "function";
	let i = source.length;

	if (!isFunc) {
		const dabbyTarget = target as Dabby;
		target = dabbyTarget.get ? $(dabbyTarget.get()) : dabbyTarget;
	}

	while (i--) {
		const sourceElement = source[i] as Element;
		const n = isFunc ? 1 : (target as Dabby).length;
		const parent = sourceElement.parentNode;
		let index = n;

		while (index--) {
			const replaceElement = isFunc
				? getVal([sourceElement], target as ReplaceCallback, (el: Element) => el)[0]
				: (target as Dabby)[index];

			if (index > 0) {
				const cloned = $(replaceElement as Selector);
				sourceElement.insertAdjacentElement(
					"beforebegin",
					(cloned.clone?.(true).get?.(0) as Element) ?? (cloned[0] as Element)
				);
			} else {
				const replacement = i > 0
					? (() => {
						const cloned = $(replaceElement as Selector);
						return (cloned.clone?.(true).get?.(0) as Element) ?? (cloned[0] as Element);
					})()
					: replaceElement as Element;
				source[i] = parent!.replaceChild(replacement, sourceElement) as Element;
			}
		}
	}

	return $(source);
}

function replaceWith(this: Dabby, html: Selector | ReplaceCallback): Dabby {
	return factory(this, html, false);
}

Object.defineProperty(Dabby.prototype, "replaceWith", { value: replaceWith, configurable: true });

function replaceAll(this: Dabby, html: Selector): Dabby {
	return factory(this, html, true);
}

Object.defineProperty(Dabby.prototype, "replaceAll", { value: replaceAll, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    replaceAll: typeof replaceAll;
    replaceWith: typeof replaceWith;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __replaceAll = typeof replaceAll;
export type __replaceWith = typeof replaceWith;

