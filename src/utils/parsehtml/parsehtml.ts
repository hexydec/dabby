import $ from "../../core/dabby/dabby";
import parseHTML from "../../internal/parsehtml/parsehtml";

import { Dabby } from "../../types/types";

type Context = boolean | null | Document

export type DabbyObjectParseHTML = Dabby & {
    parseHTML: (html: string, context: Context, runscripts: boolean) => Element[]
} 

($ as DabbyObjectParseHTML).parseHTML = parseHTML;
