import React from 'react';
import Foo from '../foo/Foo';

export default class HelloWorld extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.title = props.title;
        this.text = props.text;
        this.foo = props.foo;
        this.listItems = props.p.map((para, i) => <p key={i}>{para.props.text}</p>);
    }

    render () {
        return (<React.Fragment>
            <p>{this.text} {this.name}</p>
            <p><b>Title: </b>{this.title}</p>
            {this.listItems}
            <Foo classList={this.foo.props.classList} text={this.foo.props.text} />
        </React.Fragment>);
    }
}