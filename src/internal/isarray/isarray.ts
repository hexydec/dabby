export default function isArray(obj: unknown): obj is unknown[] {
	return Array.isArray(obj);
}
