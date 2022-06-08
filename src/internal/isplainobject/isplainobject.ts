import isObj from "../../internal/isobj/isobj";

export default (obj: any): boolean => {
	if (isObj(obj)) {
		const proto = Object.getPrototypeOf(obj);
		return proto === null || proto === Object.prototype;
	}
	return false;
};
