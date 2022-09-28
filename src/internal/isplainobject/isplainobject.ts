import { PlainObject } from '../../core/dabby/types.js';
import isObj from '../../internal/isobj/isobj.js';

export default (obj: any) : obj is PlainObject => {
	if (isObj(obj)) {
		const proto = Object.getPrototypeOf(obj);
		return proto === null || proto === Object.prototype;
	}
	return false;
};
