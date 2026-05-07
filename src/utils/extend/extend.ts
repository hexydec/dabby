import $ from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import isPlainObject, { type PlainObject } from "../../internal/isplainobject/isplainobject.js";
import isObj from "../../internal/isobj/isobj.js";

/**
 * Deep-merge one or more source objects into the target.
 *
 * Plain objects and arrays are merged recursively; all other values overwrite
 * the existing key. Properties named `__proto__` are skipped to avoid prototype
 * pollution.
 *
 * @param deep - pass `true` to merge recursively
 * @param target - the object that receives merged properties (mutated in place)
 * @param sources - one or more source objects whose properties are copied across
 * @returns the mutated target object
 *
 * @example
 * const settings = $.extend(true, { ui: { theme: "light" } }, { ui: { dense: true } });
 * // settings.ui === { theme: "light", dense: true }
 */
// Deep extend overload
function extend(deep: true, target: PlainObject, ...sources: PlainObject[]): PlainObject;
/**
 * Shallow-merge one or more source objects into the target.
 *
 * When called with a single argument, the properties are merged onto the
 * factory `$` itself, mirroring jQuery's `$.extend(plugin)` behaviour.
 *
 * @param target - the object that receives merged properties (a new object is returned, the target is not mutated)
 * @param sources - one or more source objects whose properties are copied across
 * @returns a new object containing the merged properties
 *
 * @example
 * const merged = $.extend({}, defaults, overrides);
 */
// Shallow extend overload
function extend(target: PlainObject, ...sources: PlainObject[]): PlainObject;
// Implementation
function extend(
	deepOrTarget: boolean | PlainObject,
	targetOrSource?: PlainObject,
	...sources: PlainObject[]
): PlainObject {
	// Deep copy
	if (deepOrTarget === true) {
		let target = targetOrSource;

		// Check base is object
		if (!isObj(target)) {
			target = {};
		}

		// Merge items in second object into first
		if (sources.length > 0 && isObj(sources[0])) {
			const source = sources[0];

			for (const prop in source) {
				// Only allow own properties and don't merge prototypes
				if (prop !== "__proto__" && target![prop] !== source[prop]) {
					const isArr = Array.isArray(source[prop]);

					// Only deep merge plain objects and arrays
					if (isArr || isPlainObject(source[prop])) {
						target![prop] = extend(
							true,
							(Array.isArray(target![prop]) === isArr
								? target![prop]
								: (isArr ? [] : {})) as PlainObject,
							source[prop] as PlainObject
						);
					} else {
						target![prop] = source[prop];
					}
				}
			}
		}

		// Merge the next object
		if (sources.length > 1 && isObj(sources[1])) {
			return extend(true, target!, ...sources.slice(1));
		}

		return target!;
	}

	// Shallow copy
	const allSources: PlainObject[] = [];

	if (targetOrSource !== undefined) {
		allSources.push(deepOrTarget as PlainObject);
		allSources.push(targetOrSource);
		allSources.push(...sources);
	} else {
		// Copy into Dabby object when only one arg
		allSources.push($ as unknown as PlainObject);
		allSources.push(deepOrTarget as PlainObject);
	}

	return Object.assign({}, ...allSources);
}

import type { DabbyFactory } from "../../types.js";
($ as DabbyFactory & { extend: typeof extend }).extend = extend;

// Augment ModularDabbyStatics for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyStatics {
    extend(deep: true, target: Record<string, unknown>, ...sources: Record<string, unknown>[]): Record<string, unknown>;
    extend(target: Record<string, unknown>, ...sources: Record<string, unknown>[]): Record<string, unknown>;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __extend = typeof extend;
