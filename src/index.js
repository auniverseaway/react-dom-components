if (!global || !global._babelPolyfill) {
    require('babel-polyfill')
}

import DOMModel from './dommodel/DOMModel';
import DOMRegistry from './domregistry/DOMRegistry';
import createRDC from './createRDC';


export { createRDC, DOMModel, DOMRegistry };
