import isObj from "../../internal/isobj/isobj";
export default (obj) => {
    if (isObj(obj)) {
        const proto = Object.getPrototypeOf(obj);
        return proto === null || proto === Object.prototype;
    }
    return false;
};
//# sourceMappingURL=isplainobject.js.map