import { createRDC, DOMModel, DOMComponent } from '../../../';
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
        this.getAttribute('data-title', 'title');
        this.getChildDOMModel('p', ParaModel);
    }
}

const RDCSectionDOM = createRDC('rdc-section', RDCSectionModel, RDCSectionComponent);

export default RDCSectionDOM;
