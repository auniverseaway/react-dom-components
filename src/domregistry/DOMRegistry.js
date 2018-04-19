/* global document, MutationObserver */
/**
 * The <code>DOMRegistry</code> Class is used to register, find, and
 * render React DOM Components. It provides a mechanism to determine if
 * a registered DOM Component is a child of an existing DOM Component.
 */
export default class DOMRegistry {
    constructor(components) {
        this.components = components;
        this.getNodeNames();
        this.init(document);
        this.watch();
    }

    /**
     * Initialize the DOM Registry.
     */
    init(parentNode) {
        // Loop through all registred DOM Components
        this.components.forEach((component) => {
            // Find all potential nodes of the components
            const componentNodes = parentNode.querySelectorAll(component.nodeName);

            // Loop through each node and determine if we can render it.
            componentNodes.forEach((componentNode) => {
                const canRender = this.traverseUpDom(componentNode);
                if (canRender) {
                    component.render(componentNode);
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
        this.components.forEach((component) => {
            this.nodeNames[component.nodeName] = true;
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
            if (this.nodeNames[parentNodeName]) {
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
     * Watch for changes on the body. If the change meets
     * the criteria, determine if it should be re-rendered.
     */
    watch() {
        const body = document.querySelector('body');
        const config = {
            childList: true,
            subtree: true,
        };

        const callback = (mutationsList) => {
            mutationsList.forEach((mutation) => {
                // This will only work for AEM
                if (mutation.removedNodes.length === 1) {
                    const { addedNodes } = mutation;
                    addedNodes.forEach((addedNode) => {
                        if (addedNode.nodeType === 1) {
                            this.init(addedNode);
                        }
                    });
                }
            });
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(callback);
        observer.observe(body, config);
    }
}
