import { DOMModel, DOMComponent } from '../../../../lib/index';
import RDCSectionComponent from './RDCSectionComponent';

class ParaModel extends DOMModel {
    constructor(element) {
        super(element);
        this.getTextContent();
    }
}

class RDCSectionModel extends DOMModel {
    constructor(element) {
        super(element);
        this.getDataAttribute('title');
        this.getChildComponent('p', ParaModel);
    }
}

export default class RDCSectionDOM extends DOMComponent {
    static get nodeName() { return 'rdc-section' }
    static get model() { return RDCSectionModel }
    static get component() { return RDCSectionComponent }
}
