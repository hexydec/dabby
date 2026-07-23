export default function dasherise(prop: string): string {
	return prop.indexOf("--") === 0
		? prop
		: prop.replace(/[A-Z]/g, letter => "-" + letter.toLowerCase());
}
