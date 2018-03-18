/**
 * The <code>DOMRegistry</code> Class is used to register, find, and
 * render React DOM Components. It provides a mechanism to determine if
 * a registered DOM Component is a child of an existing DOM Component.
 */
export default class DOMRegistry {
    constructor(components) {
        this.components = components;
        this.renderedComponents = [];
        this.getNodeNames();
        this.init();
    }

    /**
     * Initialize the DOM Registry.
     */
    init() {
        // Loop through all registred DOM Components
        this.components.forEach((component, index) => {
            // Find all potential nodes of the components
            const componentNodes = document.querySelectorAll(component.nodeName);

            // Loop through each node and determine if we can render it.
            componentNodes.forEach(componentNode => {
                const canRender = this.traverseUpDom(componentNode);
                if (canRender) {
                    this.renderedComponents[index] = component.render(componentNode);
                }
            });
        });
    }

    /**
     * Create an array of element node names to look for.
     * @return {array} nodeNames
     */
    getNodeNames() {
        this.nodeNames = {};
        this.components.forEach(component => {
            this.nodeNames[component.nodeName] = true;
        });
    }

    /**
     * Traverse up the DOM from the supplied node to see if any parents
     * are React DOM Components.
     * @return {boolean} canRender Whether the component can render with React.
     */
    traverseUpDom(node) {
        const parentNode = node.parentNode;
        // If the DOM has already been swapped out by React, the parent node will be null.
        if (parentNode !== null) {
            const parentNodeName = parentNode.nodeName.toLowerCase();
            if (this.nodeNames[parentNodeName]) {
                return false;
            } else if (parentNodeName === 'body') {
                return true;
            } else {
                this.traverseUpDom(parentNode);
                return true;
            }
        } else {
            return false;
        }
    }

    /**
     * Get a rendered react component
     * @return {React.Component} component The rendered component
     */
    getRenderedComponent(index) {
        return this.renderedComponents[index];
    }
}
