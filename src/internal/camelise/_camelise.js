export default prop => prop.indexOf("--") === 0 ? prop : prop.replace(/-([\w])/g, (text, letter) => letter.toUpperCase()); // matches underscore too but you shouldn't do that anyway
