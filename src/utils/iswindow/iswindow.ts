import $ from "../../core/dabby/dabby";
import isWindow from "../../internal/iswindow/iswindow";

import { Dabby } from "../../types/types";

export type DabbyObjectIsWindow = Dabby & {
    isWindow: (obj: any) => boolean
} 

($ as DabbyObjectIsWindow).isWindow = isWindow;
