import { createRDC, DOMModel, DOMRegistry } from '../';
import React from 'react';
import { render } from 'react-dom';
import renderer from 'react-test-renderer';

function HelloWorld (props){
    return (<React.Fragment>
        <p>{props.text} {props.name}</p>
        <p>{props.title}</p>
    </React.Fragment>);
}

class HelloWorldModel extends DOMModel {
    constructor(element) {
        super(element);
        this.getDataAttribute('name');
        this.getAttribute('data-title', 'title');
        this.getTextContent();
    }
}

const helloWorldComponent = createRDC('hello-world', HelloWorldModel, HelloWorld);

document.body.innerHTML = '<div><hello-world data-name="Name" data-title="My Title">Hello World</hello-world></div>';

describe('React Dom Component', () => {
    const domRegistry = new DOMRegistry(React, render);
    domRegistry.register({helloWorldComponent});
    domRegistry.init();

    test('Html DOM should be converted to a react component', () => {
        const tree = renderer
            .create(domRegistry.components['helloWorldComponent'].rendered[0].reactElement)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('registry should store rendered properties', () => {
        expect(domRegistry.components['helloWorldComponent'].rendered[0].rootElement).toBe(document);
        expect(domRegistry.components['helloWorldComponent'].rendered[0].reactElement.props.title).toBe('My Title');
        expect(domRegistry.components['helloWorldComponent'].rendered[0].reactElement.props.name).toBe('Name');
    });

    test('should have ref be null for stateless (functional) components', () => {
        expect(domRegistry.components['helloWorldComponent'].rendered[0].ref).toBeNull();
    });
});
