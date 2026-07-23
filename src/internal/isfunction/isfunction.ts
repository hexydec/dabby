export default function isFunction(func: unknown): func is Function {
	return typeof func === "function";
}
