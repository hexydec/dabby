import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import type { Selector } from "../../types.js";
import getVal from "../../internal/getval/getval.js";

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
				const cloned = $(replaceElement as Selector) as Dabby & { clone?: (deep: boolean) => Dabby & { get?: (index: number) => Element } };
				sourceElement.insertAdjacentElement(
					"beforebegin",
					(cloned.clone?.(true).get?.(0) as Element) ?? (cloned[0] as Element)
				);
			} else {
				const replacement = i > 0
					? (() => {
						const cloned = $(replaceElement as Selector) as Dabby & { clone?: (deep: boolean) => Dabby & { get?: (index: number) => Element } };
						return (cloned.clone?.(true).get?.(0) as Element) ?? (cloned[0] as Element);
					})()
					: replaceElement as Element;
				source[i] = parent!.replaceChild(replacement, sourceElement) as Element;
			}
		}
	}

	return $(source);
}

/**
 * Replace each element in the collection with the supplied content.
 *
 * Accepts a selector, HTML string, node, Dabby collection or callback. When
 * a callback is supplied it is invoked once per element with the element's
 * index and current HTML, and should return the replacement content. When
 * the collection has multiple items the replacement nodes are deep-cloned
 * (with data and events) for each but the last so each receives its own copy.
 *
 * @param html - the replacement content, or a callback returning content
 * @returns a Dabby collection containing the replaced (now-detached) nodes
 *
 * @example
 * $("b").replaceWith(function () {
 *     return `<strong>${$(this).html()}</strong>`;
 * });
 */
function replaceWith(this: Dabby, html: Selector | ReplaceCallback): Dabby {
	return factory(this, html, false);
}

Object.defineProperty(Dabby.prototype, "replaceWith", { value: replaceWith, configurable: true });

/**
 * Replace every element matched by the target with the current collection.
 *
 * The inverse of `.replaceWith()`: the elements matched by `html` (the
 * target selector) are removed from the DOM and the current collection
 * takes their place.
 *
 * @param html - a selector, node, array of nodes or Dabby collection of elements to replace
 * @returns a Dabby collection containing the replaced (now-detached) nodes
 *
 * @example
 * $("<span class='new'>Updated</span>").replaceAll(".old");
 */
function replaceAll(this: Dabby, html: Selector): Dabby {
	return factory(this, html, true);
}

Object.defineProperty(Dabby.prototype, "replaceAll", { value: replaceAll, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    replaceAll(html: Selector): this;
    replaceWith(html: Selector | ReplaceCallback): this;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __replaceAll = typeof replaceAll;
export type __replaceWith = typeof replaceWith;

