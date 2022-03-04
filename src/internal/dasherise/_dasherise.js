export default prop => prop.indexOf("--") === 0 ? prop : prop.replace(/[A-Z]/g, letter => "-" + letter.toLowerCase());
