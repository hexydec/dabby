import type { Dabby } from "../../core/dabby/dabby.js";
import type { Selector } from "../../types.js";

type FilterCallback = (this: Node, index: number, node: Node) => boolean;
type Filter = FilterCallback | Selector;

export default function filterNodes(
	dabby: Dabby | Node,
	filter: Filter,
	context?: Selector | boolean,
	not?: boolean
): Node[] {
	let func: FilterCallback;
	const nodes = (dabby as Node).nodeType ? [dabby as Node] : Array.from(dabby as Dabby) as Node[];

	if (typeof context === "boolean") {
		not = context;
		context = undefined;
	}

	if (typeof filter === "function") {
		func = filter;
	} else {
		// This will be resolved once $ is imported
		let filterNodes: (string | Node)[];

		if (typeof filter === "string") {
			filterNodes = [filter];
		} else {
			// Temporary implementation - will be replaced when $ is available
			// @ts-expect-error - $ will be available at runtime
			filterNodes = $(filter, context).get();
		}

		func = (_n: number, node: Node) => {
			let i = filterNodes.length;
			while (i--) {
				const filterItem = filterNodes[i];
				if (typeof filterItem === "string") {
					if ((node as Element).matches && (node as Element).matches(filterItem)) {
						return true;
					}
				} else if (node === filterItem) {
					return true;
				}
			}
			return false;
		};
	}

	return nodes.filter((item, i) => func.call(item, i, item) === !not);
}
