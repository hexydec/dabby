import $, { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import getVal from "../../internal/getval/getval.js";
import type {} from "../../modular.js";

type ValCallback = (this: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, index: number, currentValue: string) => string | number | string[];
type ValValue = string | number | string[] | ValCallback;

// Getter
function val(this: Dabby): string | string[] | undefined;
// Setter
function val(this: Dabby, value: ValValue): Dabby;
// Implementation
function val(
	this: Dabby,
	value?: ValValue
): Dabby | string | string[] | undefined {
	// Set value
	if (value !== undefined) {
		let i = this.length;
		const dabbyCollection = this as unknown as { readonly length: number; readonly [n: number]: Element };
		const values = getVal(
			dabbyCollection,
			value,
			(obj: Element) => {
				const $obj = $(obj);
				return ($obj as Dabby & { val?: () => string | string[] | undefined }).val?.() ?? "";
			}
		);

		while (i--) {
			const element = this[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
			const isArr = Array.isArray(values[i]);

			// Array on select, set matching values to selected
			if (element.type && element.type.includes("select")) {
				const selectElement = element as HTMLSelectElement;
				const value = values[i];
			const valuesToSelect = (isArr ? value as unknown[] : [value]).map((val: unknown) => String(val));

				$("option", selectElement).each<HTMLOptionElement>(function(this: HTMLOptionElement, _key: number, optionElement: HTMLOptionElement) {
					optionElement.selected = valuesToSelect.includes(optionElement.value || optionElement.text);
				});
			}
			// Set the checked attribute for radios and checkboxes
			else if (isArr) {
				const inputElement = element as HTMLInputElement;
				inputElement.checked = (values[i] as string[]).includes(inputElement.value);
			}
			// String value, just set to value attribute
			else {
				element.value = String(values[i]);
			}
		}
		return this;
	}

	// Read value from first node
	const firstElement = this[0] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined;
	if (firstElement) {
		// Get multiple values
		if (firstElement.type === "select-multiple") {
			const selectElement = firstElement as HTMLSelectElement;
			const values: string[] = [];

			$("option", selectElement).each<HTMLOptionElement>(function(this: HTMLOptionElement, _key: number, optionElement: HTMLOptionElement) {
				const option = optionElement as HTMLOptionElement;
				if (option.selected) {
					values.push(String(option.value));
				}
			});
			return values;
		}

		// Get single value
		if (firstElement.type !== "checkbox" || (firstElement as HTMLInputElement).checked) {
			return String(firstElement.value);
		}
	}

	return undefined;
}

Object.defineProperty(Dabby.prototype, "val", { value: val, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module 'dabbyjs' {
  interface ModularDabbyMethods {
    val: typeof val;
  }
}

// Export type witnesses to force TypeScript to include this file's augmentation
export type __val = typeof val;

