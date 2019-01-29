/**
 * Utility function to verify that the React and render objects are valid.
 * @param {*} react React from 'react'
 * @param {*} reactDOMRender { render } from 'react-dom'
 */
const verifyReactObjects = (react, reactDOMRender) => {
    if (!react || typeof(react.createElement) !== 'function' || typeof(react.Component) !== 'function') {
        console.warn('DOMRegistry: Invalid React object passed in.  Please verify the React parameter passed to DOMRegistry');
        return false;
    }

    const reactMajorVersion = react.version ? parseInt(react.version.split('.')[0]) : 0;
    if (reactMajorVersion < 16) {
        console.warn('DOMRegistry: Invalid React version.  React >= 16 must be used.  React major version detected: ', reactMajorVersion);
        return false;
    }

    if (typeof(reactDOMRender) !== 'function') {
        console.warn('DOMRegistry: Invalid reactDOMRender function passed in.  Please verify that `render` from `react-dom` is passed in.');
        return false;
    }

    return true;
}


/* global document, MutationObserver */
/**
 * The <code>DOMRegistry</code> Class is used to register, find, and
 * render React DOM Components. It provides a mechanism to determine if
 * a registered DOM Component is a child of an existing DOM Component.
 */
export default class DOMRegistry {
    /**
     * DOMRegistry Constructor.  Pass in the React (from 'react') and render (from 'react-dom') objects
     * to use in rendering the DOMComponents.
     * @param {object} React The main React object
     * @param {function} reactDOMRender The render function from ReactDOM
     */
    constructor(React, reactDOMRender) {
        verifyReactObjects(React, reactDOMRender);
        this.React = React;
        this.reactDOMRender = reactDOMRender;

        this.components = {};
    }

    /**
     * Register components for the registry to process
     * @param {object} components Object containing RDC components to register.  The key will be used as the
     */
    register(components) {
        if (!this.components) {
            this.components = components;
        } else {
            this.components = Object.assign(this.components, components);
        }
        this.getNodeNames();
    }

    /**
     * Initialize the supplied element to find
     * child components and render them.
     *
     * @param {element} element (including children) to check for RDCs, defaults to `document`
     */
    init(element = document) {
        this.element = element;

        // Loop through all registred DOM Components
        const compArray = Object.keys(this.components);
        compArray.forEach((name) => {
            this.renderAll(this.element, this.components[name]);
        });
    }

    /**
     * Render the component. If an element is not supplied,
     * the element class property will be used to find all
     * nodes to be rendered.
     * @param {DOMComponent} component
     * @param {HTMLElement} element
     */
    render(component, element) {
        if (element) {
            component.render(element, this.React, this.reactDOMRender, this.element);
        } else {
            this.renderAll(this.element, component);
        }
    }

    /**
     * Render All of the matching components
     * @param {element} parentElement
     * @param {object} component RDC component to render
     */
    renderAll(parentElement, component) {
        // Find all potential nodes of the components
        const componentNodes = parentElement.querySelectorAll(component.nodeName);

        // Loop through each node and determine if we can render it.
        Array.prototype.forEach.call(componentNodes, (componentNode) => {
            const canRender = this.traverseUpDom(componentNode);
            if (canRender) {
                component.render(componentNode, this.React, this.reactDOMRender, this.element);
            }
        });
    }

    /**
     * Traverse up the DOM from the supplied node to see if any parents
     * are React DOM Components.
     * @return {boolean} canRender Whether the component can render with React.
     */
    traverseUpDom(node) {
        const { parentNode } = node;
        // If the DOM has already been swapped out by React, the parent node will be null.
        if (parentNode !== null) {
            const parentNodeName = parentNode.nodeName.toLowerCase();
            if (this.nodeNames.includes(parentNodeName)) {
                return false;
            } else if (parentNodeName === 'body') {
                return true;
            }
            this.traverseUpDom(parentNode);
            return true;
        }
        return false;
    }

    /**
     * Create an array of element node names to look for.
     * @return {array} nodeNames
     */
    getNodeNames() {
        this.nodeNames = [];
        const compArray = Object.keys(this.components);
        compArray.forEach((name) => {
            this.nodeNames.push(this.components[name].nodeName);
        });
    }
}
