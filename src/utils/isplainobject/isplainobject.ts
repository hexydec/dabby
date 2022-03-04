import $ from "../../core/dabby/dabby";
import isPlainObject from "../../internal/isplainobject/isplainobject";

import { Dabby } from "../../types/types";

export type DabbyObjectIsPlainObject = Dabby & {
    isPlainObject: (obj: any) => boolean
} 

($ as DabbyObjectIsPlainObject).isPlainObject = isPlainObject;
