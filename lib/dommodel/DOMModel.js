"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The <code>DomModel</code> Class creates a data model from
 * attributes, text, and children of a given element.
 */
var DOMModel =
/*#__PURE__*/
function () {
  function DOMModel(element) {
    _classCallCheck(this, DOMModel);

    this.props = {};
    this.element = element;
    this.getId();
    this.getClassList();
    this.getChildNodes();
  }

  _createClass(DOMModel, [{
    key: "getId",
    value: function getId() {
      this.props.id = this.element.id;
    }
  }, {
    key: "getClassList",
    value: function getClassList() {
      this.props.classList = this.element.classList;
    }
  }, {
    key: "getDataAttribute",
    value: function getDataAttribute(name) {
      this.props[name] = this.element.dataset[name];
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(name) {
      this.props[name] = this.element.getAttribute(name);
    }
  }, {
    key: "getTextContent",
    value: function getTextContent() {
      var textNode = this.getChildNode('#text');

      if (textNode !== null) {
        this.props['text'] = textNode.textContent;
      } else {
        this.props['text'] = null;
      }
    }
  }, {
    key: "getChildComponent",
    value: function getChildComponent(name, model) {
      var childElement = this.getChildNode(name);

      if (childElement !== null) {
        this.props[name] = new model(childElement);
      } else {
        this.props[name] = null;
      }
    }
  }, {
    key: "getChildComponentArray",
    value: function getChildComponentArray(name, model) {
      this.props[name] = [];

      for (var i = 0; i < this.nodes.length; ++i) {
        var nodeName = this.nodes[i].nodeName.toLowerCase();

        if (nodeName === name) {
          this.props[name].push(new model(this.nodes[i]));
        }
      }
    }
  }, {
    key: "getChildNodes",
    value: function getChildNodes() {
      this.nodes = this.element.childNodes;
    }
  }, {
    key: "getChildNode",
    value: function getChildNode(name) {
      for (var i = 0; i < this.nodes.length; ++i) {
        var nodeName = this.nodes[i].nodeName.toLowerCase();

        if (nodeName === name) {
          return this.nodes[i];
        }
      }

      return null;
    }
  }]);

  return DOMModel;
}();

exports.default = DOMModel;