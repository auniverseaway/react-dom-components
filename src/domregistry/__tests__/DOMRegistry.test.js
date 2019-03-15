import React from 'react';
import { render } from 'react-dom';

import DOMRegistry from '../DOMRegistry';
import rdcSectionDOM from '../__mocks__/rdcSection/RDCSectionDOM';
import domHtml from '../__mocks__/dom.html';

document.body.innerHTML = domHtml;

describe('DOM Registry', () => {
    const domRegistry = new DOMRegistry(React, render);

    domRegistry.register({
        rdcSectionDOM
    });

    domRegistry.init(document);

    it('if supplied a document, registry returns document', () => {
        expect(domRegistry.element).toBe(document);
    });

    it('only has one node name', () => {
        expect(domRegistry.nodeNames[0]).toBe('rdc-section');
    });
    it('section has properties', () => {
        expect(domRegistry.components['rdcSectionDOM'].rendered[0].reactElement.props.title).toBe('Problem');
    });
    it('ref is populated since RDCSectionComponent is a class based react component (stateful)', () => {
        expect(domRegistry.components['rdcSectionDOM'].rendered[0].ref.props.title).toBe('Problem');
    });
});
