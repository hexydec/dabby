export default function camelise(prop: string): string {
	return prop.indexOf("--") === 0
		? prop
		: prop.replace(/-([\w])/g, (_text, letter) => letter.toUpperCase());
}
