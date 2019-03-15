import React from 'react';
import { render } from 'react-dom';
import renderer from 'react-test-renderer';

import { createRDC, DOMModel, DOMRegistry } from '../../index';

document.body.innerHTML = '<div><hello-world data-name="Name" data-title="My Title">Hello World<my-title>The Real Title</my-title></hello-world></div>';

function Title (props) {
    return (<React.Fragment>
        <h2><b>{props.children}</b></h2>
    </React.Fragment>);
}

function HelloWorld (props) {
    return (<React.Fragment>
        <Title>{props.title}</Title>
        <p>Nested Title:</p>
        <Title>{props['my-title'].props.text}</Title>
        <p>{props.text} {props.name}</p>
    </React.Fragment>);
}

class TitleModel extends DOMModel {
    constructor(element) {
        super(element);
        this.getTextContent();
    }
}

class HelloWorldModel extends DOMModel {
    constructor(element) {
        super(element);
        this.getDataAttribute('name');
        this.getAttribute('data-title', 'title');
        this.getTextContent();
        this.getChildDOMModel('my-title', TitleModel);
    }
}

const helloWorldComponent = createRDC('hello-world', HelloWorldModel, HelloWorld);
const titleComponent = createRDC('my-title', TitleModel, Title);

describe('Nested React Dom Component', () => {
    const domRegistry = new DOMRegistry(React, render);
    domRegistry.register({ helloWorldComponent });
    domRegistry.init();

    it('should render', () => {
        const tree = renderer
            .create(domRegistry.components['helloWorldComponent'].rendered[0].reactElement)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should modify the current DOM', () => {
        expect(document.body.innerHTML).toBe('<div><hello-world data-name=\"Name\" data-title=\"My Title\"><h2><b>My Title</b></h2><p>Nested Title:</p><h2><b>The Real Title</b></h2><p>Hello World Name</p></hello-world></div>');
    });

    it('should populate childDOMModel my-title', () => {
        expect(domRegistry.components['helloWorldComponent'].rendered[0].reactElement.props['my-title']).toBeInstanceOf(TitleModel);
    });

});


