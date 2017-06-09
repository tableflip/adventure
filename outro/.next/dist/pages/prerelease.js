'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _jsxFileName = '/Users/bernardmordan/Code/adventure/outro/pages/prerelease.js?entry';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('../components');

var _preReleaseForm = require('../partials/pre-release-form');

var _preReleaseForm2 = _interopRequireDefault(_preReleaseForm);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var PreReleasePage = function (_Component) {
  (0, _inherits3.default)(PreReleasePage, _Component);

  function PreReleasePage() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PreReleasePage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PreReleasePage.__proto__ || (0, _getPrototypeOf2.default)(PreReleasePage)).call.apply(_ref, [this].concat(args))), _this), _this.onSubmit = function (_ref2) {
      var formData = _ref2.formData;

      window.localStorage.setItem('adventuredformdata', (0, _stringify2.default)(formData));
      window.location = '/thanks';
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PreReleasePage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.localStorage.removeItem('adventuredformdata');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }, _react2.default.createElement(_components.Head, { title: 'Pre release adventure', __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }), _react2.default.createElement('div', { className: 'measure-wide center pt4', __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, _react2.default.createElement('div', { className: 'f1 lh-title pv4', __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }, 'Pre release'), _react2.default.createElement(_preReleaseForm2.default, { onSubmit: this.onSubmit, __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      })));
    }
  }]);
  return PreReleasePage;
}(_react.Component);

exports.default = PreReleasePage;