import React from 'react';

export default class RDCSectionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.title = props.title;
        this.text = props.text;
        this.p = props.p;
    }

    render () {
        return (
            <React.Fragment>
                <h3>{this.title}</h3>
                <p>{this.p.props.text}</p>
            </React.Fragment>
        );
    }
}
