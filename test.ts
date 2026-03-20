/**
 * TypeScript Playground — open this file in your editor and explore.
 * Hover over variables to see inferred types, try autocomplete after the dot.
 */

// Just import $ and the modules you need — types follow automatically
import $ from './src/dabby.js';

// Import whichever modules you want — each one adds its methods to $
import './src/manipulation/html/html.js';
import './src/manipulation/text/text.js';
import './src/manipulation/empty/empty.js';
import './src/manipulation/insert/insert.js';
import './src/manipulation/remove/remove.js';
import './src/manipulation/clone/clone.js';
import './src/events/on/on.js';
import './src/events/off/off.js';
import './src/events/trigger/trigger.js';
import './src/events/named/named.js';
import './src/attributes/class/class.js';
import './src/attributes/css/css.js';
import './src/attributes/attr/attr.js';
import './src/attributes/data/data.js';
import './src/attributes/val/val.js';
import './src/attributes/show-hide/show-hide.js';
import './src/traversal/find/find.js';
import './src/traversal/filter/filter.js';
import './src/traversal/children/children.js';
import './src/traversal/add/add.js';
import './src/traversal/eq/eq.js';
import './src/traversal/first/first.js';
import './src/traversal/last/last.js';
import './src/traversal/parents/parents.js';
import './src/traversal/siblings/siblings.js';
import './src/traversal/next-prev/next-prev.js';
import './src/dimensions/width-height/width-height.js';

// Try it out
const $el = $('#app');

// Try autocomplete after the dot:
$el
