export default function isWindow(obj: unknown): obj is Window {
	return obj != null && obj === (obj as Window & { window: unknown }).window;
}
