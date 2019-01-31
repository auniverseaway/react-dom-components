/**
 * The <code>DomModel</code> Class creates a data model from
 * attributes, text, and children of a given element.
 */
export default class DOMModel {
    constructor(element) {
        this.props = {};
        this.element = element;
        this.props.element = element;
        this.getId();
        this.getClassList();
        this.getChildNodes();
    }

    /**
     * Get `this.props.id` from `element.id`.
     */
    getId() {
        this.props.id = this.element.id;
    }

    /**
     * Get `this.props.classList` from `element.classList`.
     */
    getClassList() {
        this.props.classList = this.element.classList;
    }

    /**
     * Get the elements data attribute.
     * Note that data attribute names are specified in dash-style in the DOM,
     * but camelCase is used to specify the name here due to the use of `element.dataset`
     * (e.g: `data-my-attr-name` would be `myAttrName`)
     * @param {string} name Attribute name in camelCase
     */
    getDataAttribute(name) {
        this.props[name] = this.element.dataset[name];
    }

    /**
     * Get an attribute from the element.  The full attribute name must be used.
     * Use `getDataAttribute` for `data-*` attributes.
     * The following are equivalent:
     *     `getAttribute('data-my-attr', 'myAttr')`
     *     `getDataAttribute('myAttr')`
     * @param {*} name - the full attribute name
     * @param {*} [propName] - The name to refer to this attribute by.  Defaults to `name`.
     */
    getAttribute(name, propName) {
        if (!propName) {
            propName = name;
        }
        this.props[propName] = this.element.getAttribute(name);
    }

    /**
     * Get the text content found in the element.
     * Note that this will only retrieve the first node of text found.
     */
    getTextContent() {
        const textNode = this.getChildNode('#text');
        if (textNode !== null) {
            this.props['text'] = textNode.textContent;
        } else {
            this.props['text'] = null;
        }
    }

    /**
     * Get a React DOM Component that is nested within the parent component.
     * @param {string} name - node name to find and apply `model` to
     * @param {object} model - DOMModel to apply to the `name` node
     */
    getChildDOMModel(name, model) {
        const childElement = this.getChildNode(name);
        if (childElement !== null) {
            this.props[name] = new model(childElement);
        } else {
            this.props[name] = null;
        }
    }

    /**
     * Get all nested React DOM Components as an array by searching
     * for all nodes that match `name`
     * @param {*} name - node name to find and apply `model` to
     * @param {*} model - DOMModel to apply to the `name` node
     */
    getChildDOMModelArray(name, model) {
        this.props[name] = [];
        for (let i = 0; i < this.nodes.length; ++i) {
            const nodeName = this.nodes[i].nodeName.toLowerCase();
            if (nodeName === name) {
                this.props[name].push(new model(this.nodes[i]));
            }
        }
    }

    /**
     * Assign `element.childNodes` to `this.nodes`.
     */
    getChildNodes() {
        this.nodes = this.element.childNodes;
    }

    /**
     * Get the first node matching `name`
     * @param {string} name - nodeName to search for
     * @returns {node} node that matches `name` || `null`
     */
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
