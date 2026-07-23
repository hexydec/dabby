export default function isPassive(evt: string): boolean {
	return ["wheel", "mousewheel", "touchstart", "touchmove"].includes(evt);
}
