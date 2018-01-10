import { DOMRegistry } from '../../lib/index';
import RDCSectionDOM from './components/rdcSection/RDCSectionDOM';

const rdcSection = new RDCSectionDOM();

new DOMRegistry(
    [
        rdcSection
    ]
);
