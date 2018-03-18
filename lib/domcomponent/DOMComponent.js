"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The <code>DOMComponent</code> Class provides the properties
 * and methods to map a DOMModel to a React Component. It is
 * only rendered when the DOMRegistry provides the specific
 * element to render.
 */
var DOMComponent =
/*#__PURE__*/
function () {
  function DOMComponent() {
    _classCallCheck(this, DOMComponent);

    this.nodeName = this.constructor.nodeName;
    this.model = this.constructor.model;
    this.component = this.constructor.component;
  }
  /**
   * Render the DOM Component into the supplied element.
   * @param {node} element 
   */


  _createClass(DOMComponent, [{
    key: "render",
    value: function render(element) {
      // Instantiate our DomModel
      var domModel = new this.model(element); // Set our properties

      this.props = domModel.props; // Create our React element

      var el = _react.default.createElement(this.component, this.props); // Render it


      return (0, _reactDom.render)(el, element);
    }
  }]);

  return DOMComponent;
}();

exports.default = DOMComponent;