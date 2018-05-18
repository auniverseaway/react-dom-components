import { DOMRegistry } from '../../lib/index';
import RDCSectionDOM from './components/rdcSection/RDCSectionDOM';

const rdcSection = new RDCSectionDOM();

const rdcRegistry = new DOMRegistry(document);
rdcRegistry.register({ rdcSection });
