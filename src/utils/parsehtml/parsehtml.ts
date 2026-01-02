import $ from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import parseHTML from "../../internal/parsehtml/parsehtml.js";
import type {} from "../../modular.js";
import type { DabbyFactory } from "../../types.js";
import type {} from "../../modular.js";

($ as DabbyFactory & { parseHTML: typeof parseHTML }).parseHTML = parseHTML;
