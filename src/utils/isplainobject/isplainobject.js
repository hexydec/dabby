$.isPlainObject = obj => {
	
	// Basic check for Type object that's not null
	if (typeof obj === "object" && obj !== null) {

		// If Object.getPrototypeOf supported, use it
	    if (typeof Object.getPrototypeOf == 'function') {
			let proto = Object.getPrototypeOf(obj);
			return proto === Object.prototype || proto === null;
	    }

	    // Otherwise, use internal class
	    // This should be reliable as if getPrototypeOf not supported, is pre-ES5
		return Object.prototype.toString.call(obj) === "[object Object]";
 	}

 	// Not an object
	return false;
};
