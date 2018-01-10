import React from 'react';

export default class Foo extends React.Component {
    constructor(props) {
        super(props);
        this.text = props.text;
    }

    render () {
        return <p className={this.props.classList}>{this.text}</p>;
    }
}