# React DOM Components
Build data models for React Components using server-side DOM.

## Problem
Often times, using Node to render DOM server-side is not feasible. This could be due to technology, infrastructure, or even cache reasons. In these situations, one is left with either not using React or ignoring the initial server-side DOM. Both options have significant downsides.

## Solution
React DOM Components are a technology agnostic way to get DOM properties (attributes, text content, child elements) and pass them in to React Components. By doing so, the initial render of a page can still be server-side (Java, .NET, PHP, etc.), but React can take over and provide the many features it does.

## Requirements
* An ES6 development environment
* React & React DOM
* Custom Element Polyfill

## Version History
### 1.0.0
* Changed API for DOM Registry
* Changed API for DOM Component
* Update to latest versions of React & Babel
* Added a few unit tests

### 0.1.0
* Support for mutation observer to watch for server-side changes to DOM.

## Installation
    npm i -D react-dom-components

## Usage
### Sample Project
For the sake of seeing a real world use case, please see the [React DOM Components Sample](https://github.com/auniverseaway/react-dom-components-sample) project.

### DOM Component
The first thing to build is a React DOM Component. 

For performance and semantic reasons, it's highly recommended to use custom element names. This requires a custom-element polyfill for most browsers.

**Here you specify:**
* The element name to look for in the DOM.
* The DOMModel to be used with the element.
* The React Component to render.

```js
export default class HelloWorldDOMComponent extends DOMComponent {
    this.nodeName = 'hello-world';
    this.model = HelloWorldModel;
    this.component = HelloWorld;
}
```

### DOM Model
The DOM Model is what maps DOM attributes, text content, and child elements to properties (`this.props`) on the React Component.

```js
class HelloWorldModel extends DOMModel {
    constructor(element) {
        super(element);
        this.getDataAttribute('name');
        this.getAttribute('data-title', 'title');
        this.getTextContent();
        this.getChildDOMModel('foo', FooModel);
    }
}
```

In this example, we are using:
* The `data-name` attribute
* The `data-title` attribute
* The text content
* Mapping a custom child element to another DOM Model

### React Component
The React Component is like any other vanilla React Component. Our props are merely properties we receive from our DOM Model. In the case of our child element, this is simply a child object with all the properties from the `FooModel`.

```jsx
export default class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.title = props.title;
        this.text = props.text;
        this.fooText = props.foo.props.text;
    }

    render () {
        return (<React.Fragment>
            <p>{this.text} {this.name}</p>
            <p>{this.title}</p>
            <Foo text={this.fooText} />
        </React.Fragment>);
    }
}
```
**Note:** The above example uses React 16.2's new fragment syntax.

### Registering a React DOM Component
In order to efficiently discover our React DOM Components, we register each. This service finds all instances, determines if they should be rendered, and passes in the DOM
element that matches the criteria.

```js
const helloWorld = new HelloWorldDOMComponent();
const foo = new FooDOMComponent();

const domRegistry = new DOMRegistry(document);
domRegistry.register({ helloWorld, foo });
```

If you have several nested React Components that happen to also be DOM Components (as in the case above), the registry will only render the React DOM Components that are not within an existing React DOM Component.
