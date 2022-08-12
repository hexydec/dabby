export default (obj: any) => {
    return new Proxy(obj, {
        set: function (self, prop, value) {
            return Object.defineProperty(self, prop, {
                value: value,
                writable: false,
            });
        },
    });
};
