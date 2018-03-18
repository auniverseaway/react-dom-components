"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The <code>DOMRegistry</code> Class is used to register, find, and
 * render React DOM Components. It provides a mechanism to determine if
 * a registered DOM Component is a child of an existing DOM Component.
 */
var DOMRegistry =
/*#__PURE__*/
function () {
  function DOMRegistry(components) {
    _classCallCheck(this, DOMRegistry);

    this.components = components;
    this.renderedComponents = [];
    this.getNodeNames();
    this.init();
  }
  /**
   * Initialize the DOM Registry.
   */


  _createClass(DOMRegistry, [{
    key: "init",
    value: function init() {
      var _this = this;

      // Loop through all registred DOM Components
      this.components.forEach(function (component, index) {
        // Find all potential nodes of the components
        var componentNodes = document.querySelectorAll(component.nodeName); // Loop through each node and determine if we can render it.

        componentNodes.forEach(function (componentNode) {
          var canRender = _this.traverseUpDom(componentNode);

          if (canRender) {
            _this.renderedComponents[index] = component.render(componentNode);
          }
        });
      });
    }
    /**
     * Create an array of element node names to look for.
     * @return {array} nodeNames
     */

  }, {
    key: "getNodeNames",
    value: function getNodeNames() {
      var _this2 = this;

      this.nodeNames = {};
      this.components.forEach(function (component) {
        _this2.nodeNames[component.nodeName] = true;
      });
    }
    /**
     * Traverse up the DOM from the supplied node to see if any parents
     * are React DOM Components.
     * @return {boolean} canRender Whether the component can render with React.
     */

  }, {
    key: "traverseUpDom",
    value: function traverseUpDom(node) {
      var parentNode = node.parentNode; // If the DOM has already been swapped out by React, the parent node will be null.

      if (parentNode !== null) {
        var parentNodeName = parentNode.nodeName.toLowerCase();

        if (this.nodeNames[parentNodeName]) {
          return false;
        } else if (parentNodeName === 'body') {
          return true;
        } else {
          this.traverseUpDom(parentNode);
          return true;
        }
      } else {
        return false;
      }
    }
    /**
     * Get a rendered react component
     * @return {React.Component} component The rendered component
     */

  }, {
    key: "getRenderedComponent",
    value: function getRenderedComponent(index) {
      return this.renderedComponents[index];
    }
  }]);

  return DOMRegistry;
}();

exports.default = DOMRegistry;