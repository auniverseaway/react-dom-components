"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DOMModel", {
  enumerable: true,
  get: function get() {
    return _DOMModel.default;
  }
});
Object.defineProperty(exports, "DOMComponent", {
  enumerable: true,
  get: function get() {
    return _DOMComponent.default;
  }
});
Object.defineProperty(exports, "DOMRegistry", {
  enumerable: true,
  get: function get() {
    return _DOMRegistry.default;
  }
});

var _DOMModel = _interopRequireDefault(require("./dommodel/DOMModel"));

var _DOMComponent = _interopRequireDefault(require("./domcomponent/DOMComponent"));

var _DOMRegistry = _interopRequireDefault(require("./domregistry/DOMRegistry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }