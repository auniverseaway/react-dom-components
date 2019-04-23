# React DOM Components
Build data models for React Components using server-side DOM.

## Problem
Often times, using Node to render DOM server-side is not feasible. This could be due to technology, infrastructure, or even cache reasons. In these situations, one is left with either not using React or ignoring the initial server-side DOM. Both options have significant downsides.

## Solution
React DOM Components are a technology agnostic way to get DOM properties (attributes, text content, child elements) and pass them in to React Components. By doing so, the initial render of a page can still be server-side (Java, .NET, PHP, etc.), but React can take over and provide the many features it does.

## Requirements
* An ES6 development environment
* React & React DOM

## Optional Requirements (for older browsers)
* Custom Element Polyfill
* Babel Polyfill

## Version History
### 3.0.0
* Remove babel polyfill from compile

### 2.0.1
* Updated dependencies

### 2.0.0
* API Change - Bring your own React Version - See docs below.
* Updated dependencies

### 1.0.3
* ForEach polyfill is no longer required for IE11 support.
* Improvements around loading babel-polyfill.

### 1.0.2
* Small fixes to Registry

### 1.0.1
* Add Babel Polyfill for IE11 support

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
TBD

### The DOM that will be used to create our components
The following is some sample DOM that would be created server-side, which would then be scraped by React DOM Components to create a React Component on the page:

```html
<div>
    <hello-world data-name="My Name" data-title="My Title">
        Hi how are you doing?
    </hello-world>
</div>
```

### DOM Model
The DOM Model is what maps DOM attributes, text content, and child elements to properties (`this.props`) on the React Component.

```js
// file: HelloWorldModel.js
import { DOMModel } from 'react-dom-components';

class HelloWorldModel extends DOMModel {
    constructor(element) {
        super(element);
        this.getDataAttribute('name');
        this.getAttribute('data-title', 'title');
        this.getTextContent();
    }
}
```

In this example, we are using:
* The `data-name` attribute ("My Name")
* The `data-title` attribute ("My Title")
* The text content ("Hi how are you doing?")

### React Component
The React Component is like any other vanilla React Component. Our props are merely properties we receive from our DOM Model.

```jsx
// file: HelloWorld.jsx
export default class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.title = props.title;
        this.text = props.text;
    }

    render () {
        return (<React.Fragment>
            <p>{this.text} {this.name}</p>
            <p>{this.title}</p>
        </React.Fragment>);
    }
}
```
**Note:** The above example uses React 16.2's new fragment syntax.

### DOM Component
The DOM Component is what React DOM Components uses to instantiate the React Component.

For performance and semantic reasons, it's highly recommended to use custom element names. This requires a custom-element polyfill for most browsers.  Alternatively, class selectors can also be used, in which case the nodeName must be prefaced with a `.`.

A special utility function `createRDC` is used to tie together the model and the react component defined above.

**Here you specify:**
* The element name (or selector) to look for in the DOM.
* The DOMModel to be used with the element.
* The React Component to render.

The function signature is `createRDC(nodeName, model, component)`

```js
// file: helloWorldRDC.js
import { createRDC } from 'react-dom-components';
import HelloWorld from './HelloWorld'; // HelloWorld.jsx
import HelloWorldModel from './HelloWorldModel';

const helloWorldRDC = createRDC('hello-world', HelloWorldModel, HelloWorld);
export default helloWorldRDC;
```

(Note that it is standard practice to define the Model and RDC in the same file, and the React component as a separate jsx file.  For the purposes of this sample, each has been defined in it's own file.)

### Registering a React DOM Component
In order to efficiently discover our React DOM Components, we register each. This service finds all instances, determines if they should be rendered, and passes in the DOM
element that matches the criteria.

Before we can register the components, the registry needs to be provided with the React object and ReactDOM.render function which are used to instantiate and render the RDC.

```js
// file: app.js
import React from 'react';
import { render } from 'react-dom';
import { DOMRegistry } from 'react-dom-components';

import helloWorldRDC from './helloWorldRDC';

const domRegistry = new DOMRegistry(React, render);
domRegistry.register({ helloWorldRDC });
domRegistry.init(document); // init defaults to `document` if not no param is defined

```

If you have several nested React Components that happen to also be DOM Components, the registry will only render the React DOM Components that are not within an existing React DOM Component.
