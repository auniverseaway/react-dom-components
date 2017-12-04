/**
 * The <code>DomModel</code> Class creates a data model from
 * attributes, text, and children of a given element.
 */
export default class DOMModel {
    constructor(element) {
        this.props = {};
        this.element = element;
    }

    getDataAttribute(name) {
        this.props[name] = this.element.dataset[name];
    }

    getTextContent() {
        const textNode = this.getChildNode('#text');
        if (textNode !== null) {
            this.props['text'] = textNode.textContent;
        } else {
            this.props['text'] = null;
        }
    }

    getChildComponent(name, model) {
        const childElement = this.getChildNode(name);
        if (childElement !== null) {
            this.props[name] = new model(childElement);
        } else {
            this.props[name] = null;
        }
    }

    getChildNode(name) {
        const nodes = this.element.childNodes;
        for (let i = 0; i < nodes.length; ++i) {
            const nodeName = nodes[i].nodeName.toLowerCase();
            if (nodeName === name) {
                return nodes[i];
            }
        }
        return null;
    }
}