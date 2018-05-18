import { DOMModel, DOMComponent } from 'react-dom-components';
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

export default class RDCSectionDOM extends DOMComponent {
    constructor() {
        super();
        this.nodeName = 'rdc-section';
        this.model = RDCSectionModel;
        this.component = RDCSectionComponent;
    }
}
