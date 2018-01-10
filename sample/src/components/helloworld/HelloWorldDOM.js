import { DOMModel, DOMComponent } from 'react-dom-components';
import HelloWorld from './HelloWorld';
import { FooModel } from '../foo/FooDOM';

class ParaModel extends DOMModel {
    constructor(element) {
        super(element);
        this.getTextContent();
    }
}

class HelloWorldModel extends DOMModel {
    constructor(element) {
        super(element);
        this.getDataAttribute('name');
        this.getDataAttribute('title');
        this.getTextContent();
        this.getChildComponentArray('p', ParaModel);
        this.getChildComponent('foo', FooModel);
    }
}

export default class HelloWorldDOM extends DOMComponent {
    static get nodeName() { return 'hello-world' }
    static get model() { return HelloWorldModel }
    static get component() { return HelloWorld }
}
