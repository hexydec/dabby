export default prop => prop.replace(/[A-Z]/g, letter => "-" + letter.toLowerCase());
