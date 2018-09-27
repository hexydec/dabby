export default prop => prop.replace(/-([a-z])/gi, (text, letter) => letter.toUpperCase());
