import isPlainObject, { type PlainObject } from "../isplainobject/isplainobject.js";

type ValueCallback<T, C> = (this: T, index: number, current: C) => unknown;
type CurrentCallback<T> = (item: T) => unknown;

export default function getVal<T, C>(
	obj: { readonly length: number; readonly [n: number]: T },
	val: unknown | PlainObject | ValueCallback<T, C>,
	current?: C | CurrentCallback<T>
): unknown[] {
	let i = obj.length;
	const values: unknown[] = [];

	if (i) {
		const funcVal = typeof val === "function";
		const objVal = funcVal ? false : isPlainObject(val);
		const funcCurrent = typeof current === "function";

		while (i--) {
			if (funcVal) {
				const callback = val as ValueCallback<T, C>;
				const currentValue = funcCurrent
					? (current as CurrentCallback<T>)(obj[i])
					: current;
				values[i] = callback.call(obj[i], i, currentValue as C);
			} else if (objVal) {
				values[i] = Object.create(val as PlainObject);
			} else {
				values[i] = val;
			}
		}
	}
	return values;
}
