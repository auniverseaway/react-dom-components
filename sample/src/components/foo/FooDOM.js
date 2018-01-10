import { DOMModel, DOMComponent } from 'react-dom-components';
import Foo from './Foo';

class FooModel extends DOMModel {
    constructor(element) {
        super(element);
        this.getTextContent();
    }
}

class FooDOM extends DOMComponent {
    static get nodeName() { return 'foo'; }
    static get model() { return FooModel }
    static get component() { return Foo }
}

export { FooModel, FooDOM };