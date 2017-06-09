'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddItem = undefined;

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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jsxFileName = '/Users/bernardmordan/Code/adventure/outro/partials/user-create-list.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _components = require('../components');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (props) {
  return _react2.default.createElement('div', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, props.list.length > 0 && props.list.map(function (item, i) {
    return _react2.default.createElement(_components.ListItem, { className: 'mb2', key: item._id || item + '-' + i, __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      }
    }, _react2.default.createElement('div', { className: 'flex-auto', __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    }, item), _react2.default.createElement('div', { className: 'flex-none ml2', onClick: function onClick() {
        return props.remove(item);
      }, __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    }, _react2.default.createElement(_components.IconRemove, { translate: '0, 2', __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    })));
  }), _react2.default.createElement(AddItem, (0, _extends3.default)({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  })));
};

var AddItem = exports.AddItem = function (_Component) {
  (0, _inherits3.default)(AddItem, _Component);

  function AddItem() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AddItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AddItem.__proto__ || (0, _getPrototypeOf2.default)(AddItem)).call.apply(_ref, [this].concat(args))), _this), _this.state = { value: '' }, _this.onChange = function (e) {
      var value = e.target.value;

      _this.setState({ value: value });
    }, _this.onPaste = function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!_this.props.paste) return;
      var clipboardData = e.clipboardData || window.clipboardData;
      _this.props.onPaste(clipboardData.getData('Text'));
    }, _this.onClick = function () {
      var value = _this.state.value;

      if (value === '') return console.error('no value!');
      _this.props.add(_this.state.value);
      _this.setState({ value: '' });
    }, _this.onKeyPress = function (e) {
      if (e.key === 'Enter' || e.key === 'Tab') {
        if (!_this.props.schema) return _this.onClick();
        _this.props.schema.validate(_this.state.value, function (err) {
          if (!err) _this.onClick();
        });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AddItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          schema = _props.schema,
          minValidationLength = _props.minValidationLength,
          name = _props.name;

      var inputProps = {
        name: name,
        onChange: this.onChange,
        value: this.state.value,
        onPaste: this.onPaste,
        onKeyPress: this.onKeyPress
      };
      return _react2.default.createElement('div', { className: 'flex justify-end items-center w-100 pr2', __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        }
      }, this.props.schema ? _react2.default.createElement(_components.ValidatedInput, (0, _extends3.default)({ schema: schema, minValidationLength: minValidationLength }, inputProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      })) : _react2.default.createElement(_components.Input, (0, _extends3.default)({}, inputProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      })), _react2.default.createElement('div', { className: 'flex-none pointer mb2', onClick: this.onClick, __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        }
      }, _react2.default.createElement('span', { className: 'black-40 f6 semibold mh2 mr2', __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, 'add item'), _react2.default.createElement(_components.IconPlus, { translate: '0, 2', __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      })));
    }
  }]);
  return AddItem;
}(_react.Component);

AddItem.propTypes = {
  name: _propTypes2.default.string.isRequired,
  add: _propTypes2.default.func.isRequired,
  paste: _propTypes2.default.func,
  schema: _propTypes2.default.object,
  minValidationLength: _propTypes2.default.number
};