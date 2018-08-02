/* global document, MutationObserver */
/**
 * The <code>DOMRegistry</code> Class is used to register, find, and
 * render React DOM Components. It provides a mechanism to determine if
 * a registered DOM Component is a child of an existing DOM Component.
 */
export default class DOMRegistry {
    constructor(element) {
        this.element = this.getParentNode(element);
    }

    getParentNode(element) {
        return element ? element : document;
    }

    register(components) {
        this.components = components;
        this.getNodeNames();
        this.init();
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
            component.render(element);
        }
        else {
            this.renderAll(component);
        }
    }

    /**
     * Initialize the DOM Registry.
     */
    init() {
        // Loop through all registred DOM Components
        const compArray = Object.keys(this.components);
        compArray.forEach((name) => {
            this.renderAll(this.components[name]);
        });
    }

    renderAll(component) {
        // Find all potential nodes of the components
        const componentNodes = this.element.querySelectorAll(component.nodeName);

        // Loop through each node and determine if we can render it.
        var nodes = [].slice.call(componentNodes);
        nodes.forEach(function (componentNode) {
            const canRender = this.traverseUpDom(componentNode);
            if (canRender) {
                component.render(componentNode);
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
