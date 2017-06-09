'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _jsxFileName = '/Users/bernardmordan/Code/adventure/outro/components/forms/input.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (_ref) {
  var props = (0, _objectWithoutProperties3.default)(_ref, []);
  return _react2.default.createElement('div', { className: 'pv2 w-100', __source: {
      fileName: _jsxFileName,
      lineNumber: 2
    }
  }, props.label && _react2.default.createElement('label', { htmlFor: props.id || props.name, className: 'f6 b db mb2', __source: {
      fileName: _jsxFileName,
      lineNumber: 3
    }
  }, props.label), _react2.default.createElement('input', (0, _extends3.default)({}, props, { className: 'input-reset ba b--black-20 pa2 mb2 db w-100 outline-0 flex-auto', __source: {
      fileName: _jsxFileName,
      lineNumber: 4
    }
  })));
};