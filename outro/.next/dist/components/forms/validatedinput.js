'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _jsxFileName = '/Users/bernardmordan/Code/adventure/outro/components/forms/validatedinput.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var ValidatedInput = function (_Component) {
  (0, _inherits3.default)(ValidatedInput, _Component);

  function ValidatedInput() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ValidatedInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ValidatedInput.__proto__ || (0, _getPrototypeOf2.default)(ValidatedInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      error: null
    }, _this.onChange = function (e) {
      var _this$props$minValida = _this.props.minValidationLength,
          minValidationLength = _this$props$minValida === undefined ? 1 : _this$props$minValida;

      if (e.target.value.length <= minValidationLength) return _this.props.onChange(e);

      _this.props.schema.validate(e.target.value, function (error, value) {
        _this.setState({ error: error });
        _this.props.onChange(e);
        e.target.focus();
      });
    }, _this.onBlur = function (e) {
      _this.props.schema.validate(e.target.value, function (error, value) {
        if (error) _this.setState({ error: error });
      });
    }, _this.onFocus = function (e) {
      _this.setState({ error: null });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ValidatedInput, [{
    key: 'render',
    value: function render() {
      var onBlur = this.onBlur,
          onChange = this.onChange,
          onFocus = this.onFocus;
      var error = this.state.error;

      var className = error ? 'b--dark-red' : '';
      var extendedProps = (0, _assign2.default)({}, this.props, { onBlur: onBlur, onChange: onChange, onFocus: onFocus, className: className });
      return _react2.default.createElement('div', { className: 'w-100', __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        }
      }, _react2.default.createElement(_input2.default, (0, _extends3.default)({}, extendedProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        }
      })), error && _react2.default.createElement('div', { className: 'pb3 dark-red f6', __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        }
      }, error.message));
    }
  }]);
  return ValidatedInput;
}(_react.Component);

ValidatedInput.propTypes = {
  schema: _propTypes2.default.object.isRequired,
  minValidationLength: _propTypes2.default.number
};
exports.default = ValidatedInput;