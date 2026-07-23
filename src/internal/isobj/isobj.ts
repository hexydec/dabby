export default function isObj(obj: unknown): obj is object {
	return obj != null && typeof obj === "object";
}
