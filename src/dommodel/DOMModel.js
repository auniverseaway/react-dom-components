/**
 * The <code>DomModel</code> Class creates a data model from
 * attributes, text, and children of a given element.
 */
export default class DOMModel {
    constructor(element) {
        this.props = {};
        this.element = element;
        this.getId();
        this.getClassList();
        this.getChildNodes();
    }

    getId() {
        this.props.id = this.element.id;
    }

    getClassList() {
        this.props.classList = this.element.classList;
    }

    getAttribute(name) {
        this.props[name] = this.element.getAttribute(name);
    }

    getTextContent() {
        const textNode = this.getChildNode('#text');
        if (textNode !== null) {
            this.props['text'] = textNode.textContent;
        } else {
            this.props['text'] = null;
        }
    }

    getChildDOMModel(name, model) {
        const childElement = this.getChildNode(name);
        if (childElement !== null) {
            this.props[name] = new model(childElement);
        } else {
            this.props[name] = null;
        }
    }

    getChildDOMModelArray(name, model) {
        this.props[name] = [];
        for (let i = 0; i < this.nodes.length; ++i) {
            const nodeName = this.nodes[i].nodeName.toLowerCase();
            if (nodeName === name) {
                this.props[name].push(new model(this.nodes[i]));
            }
        }
    }

    getChildNodes() {
        this.nodes = this.element.childNodes;
    }

    getChildNode(name) {
        for (let i = 0; i < this.nodes.length; ++i) {
            const nodeName = this.nodes[i].nodeName.toLowerCase();
            if (nodeName === name) {
                return this.nodes[i];
            }
        }
        return null;
    }
}
