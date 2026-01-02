import $ from "../../core/dabby/dabby.js";
import type {} from "../../modular.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import type {} from "../../modular.js";
import type { DabbyFactory } from "../../types.js";
import type {} from "../../modular.js";

($ as DabbyFactory & { isPlainObject: typeof isPlainObject }).isPlainObject = isPlainObject;
