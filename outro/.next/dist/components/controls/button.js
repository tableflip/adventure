'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _jsxFileName = '/Users/bernardmordan/Code/adventure/outro/components/controls/button.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (_ref) {
  var props = (0, _objectWithoutProperties3.default)(_ref, []);

  var className = 'b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6';

  return _react2.default.createElement('button', (0, _extends3.default)({}, props, { className: className, __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    }
  }));
};