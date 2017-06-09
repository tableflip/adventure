'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/Users/bernardmordan/Code/adventure/outro/components/icons/svg.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (props) {
  return _react2.default.createElement('svg', { width: props.width || '14', height: props.height || '14', viewBox: '0 0 24 24', transform: 'translate(' + (props.translate || '0, 0') + ')', __source: {
      fileName: _jsxFileName,
      lineNumber: 2
    }
  }, props.children);
};