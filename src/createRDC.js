
export function createElement(model, component, element, React) {
    // Instantiate our DomModel
    const domModel = new model(element);
    return React.createElement(component, domModel.props);
}

export function render(element, React, reactDomRender, rootElement) {
    if (!React || !reactDomRender) {
        console.warn('React (from react) and render (from react-dom) must be passed in.');
    }

    // Create our React element
    const reactElement = createElement(this.model, this.component, element, React);

    // Render it using ReactDOM.render
    // Note that ref will not always be populated,
    // see the notes at https://reactjs.org/docs/react-dom.html#render for details
    const ref = reactDomRender(reactElement, element);

    // Every render gets a new entry in this.rendered
    this.rendered.push({ element, reactElement, ref, rootElement });
}

/**
 * Create a React DOM Component from the given parameters.
 * @param {string} nodeName Name of the element/node that will become the React component
 * @param {object} model DOMModel created for the component
 * @param {object} component React Component to use
 * @returns {object} React DOM Component to be rendered
 */
export default function createRDC(nodeName, model, component) {
    if (!nodeName || !model || !component) {
        console.warn('createRDC requires nodeName, model, and component parameters to be defined.');
    }

    // An array to store references to all rendered instances of the component
    const rendered = [];

    return {
        nodeName,
        model,
        component,
        render,
        rendered,
    }
}
