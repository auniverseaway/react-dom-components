import React from 'react';
import { render } from 'react-dom';

/**
 * The <code>DOMComponent</code> Class provides the properties
 * and methods to map a DOMModel to a React Component. It is
 * only rendered when the DOMRegistry provides the specific
 * element to render.
 */
export default class DOMComponent {
    getNodeName(nodeName) {
        return nodeName;
    }

    getModel(model) {
        return model;
    }

    getComponent(component) {
        return component;
    }

    /**
     * Render the DOM Component into the supplied element.
     * @param {node} element 
     */
    render(element) {
        // Instantiate our DomModel
        const domModel = new this.model(element);

        // Set our properties
        this.props = domModel.props;

        // Create our React element
        const el = React.createElement(this.component, this.props);

        // Render it
        render(el, element);
    }
}
