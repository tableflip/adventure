'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = '/Users/bernardmordan/Code/adventure/outro/components/forms/textarea.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Textarea = function Textarea(props) {
  return _react2.default.createElement('div', { className: 'pv2', __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    }
  }, props.label && _react2.default.createElement('label', { htmlFor: props.name, className: 'f6 b db mb2', __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }, props.label), _react2.default.createElement('textarea', { name: props.name, type: 'textarea', rows: '5', className: 'pa1 w-100 b--black-20', style: { resize: 'none' }, __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }));
};

Textarea.propTypes = {
  id: _propTypes2.default.string,
  name: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  required: _propTypes2.default.bool,
  onChange: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.string
};

exports.default = Textarea;