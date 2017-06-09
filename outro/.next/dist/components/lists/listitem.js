'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/Users/bernardmordan/Code/adventure/outro/components/lists/listitem.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (_ref) {
  var _ref$children = _ref.children,
      children = _ref$children === undefined ? null : _ref$children,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className;
  return _react2.default.createElement('div', { className: 'flex items-center justify-start bg-black-10 hover-bg-black-20 pa2 ' + className, __source: {
      fileName: _jsxFileName,
      lineNumber: 2
    }
  }, children);
};