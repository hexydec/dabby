import $ from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import isPlainObject, { type PlainObject } from "../../internal/isplainobject/isplainobject.js";
import type {} from "../../modular.js";
import isObj from "../../internal/isobj/isobj.js";
import type {} from "../../modular.js";

// Deep extend overload
function extend(deep: true, target: PlainObject, ...sources: PlainObject[]): PlainObject;
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
import type {} from "../../modular.js";
($ as DabbyFactory & { extend: typeof extend }).extend = extend;

// Augment ModularDabbyStatics for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyStatics {
    extend: typeof extend;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __extend = typeof extend;
