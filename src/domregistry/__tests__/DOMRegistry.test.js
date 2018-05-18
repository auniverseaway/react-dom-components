import DOMRegistry from '../DOMRegistry';
import RDCSectionDOM from '../../../sample/src/components/rdcSection/RDCSectionDOM';
import domHtml from '../__mocks__/dom.html';

document.body.innerHTML = domHtml;

describe('DOM Registry', () => {
    const rdcSection = new RDCSectionDOM();
    const domRegistry = new DOMRegistry(document);

    domRegistry.register({
        rdcSection
    });

    it('if supplied a document, registry returns document', () => {
        expect(domRegistry.element).toBe(document);
    });

    it('only has one node name', () => {
        expect(domRegistry.nodeNames[0]).toBe('rdc-section');
    });

    it('section has properties', () => {
        expect(domRegistry.components['rdcSection'].props.title).toBe('Problem');
    });
});