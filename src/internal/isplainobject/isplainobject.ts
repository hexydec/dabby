import isObj from "../isobj/isobj.js";

export type PlainObject = Record<string, unknown>;

export default function isPlainObject(obj: unknown): obj is PlainObject {
	if (isObj(obj)) {
		const proto = Object.getPrototypeOf(obj);
		return proto === null || proto === Object.prototype;
	}
	return false;
}
