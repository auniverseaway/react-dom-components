if (!global || !global._babelPolyfill) {
    require('babel-polyfill')
}

import DOMModel from './dommodel/DOMModel';
import DOMComponent from './domcomponent/DOMComponent'
import DOMRegistry from './domregistry/DOMRegistry';

export { DOMModel, DOMComponent, DOMRegistry };
