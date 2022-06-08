import $ from "../../core/dabby/dabby";
import isFunction from "../../internal/isfunction/isfunction";

import { Dabby } from "../../types/types";

export type DabbyObjectIsFunction = Dabby & {
    isFunction: (obj: any) => boolean
} 

($ as DabbyObjectIsFunction).isFunction = isFunction;
