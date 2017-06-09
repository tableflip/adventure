webpackHotUpdate(5,{

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddItem = undefined;

var _getPrototypeOf = __webpack_require__(39);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(42);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(41);

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = __webpack_require__(96);

var _extends3 = _interopRequireDefault(_extends2);

var _jsxFileName = '/Users/bernardmordan/Code/adventure/outro/partials/user-create-list.js';

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(85);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _components = __webpack_require__(538);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/bernardmordan/Code/adventure/outro/partials/user-create-list.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/bernardmordan/Code/adventure/outro/partials/user-create-list.js"); } } })();

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS4xOWFlZGM3NTMxNmNlMTVmMzlhNC5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFydGlhbHMvdXNlci1jcmVhdGUtbGlzdC5qcz82NGU5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IHsgSWNvblJlbW92ZSwgSWNvblBsdXMsIElucHV0LCBMaXN0SXRlbSwgVmFsaWRhdGVkSW5wdXQgfSBmcm9tICcuLi9jb21wb25lbnRzJ1xuXG5leHBvcnQgZGVmYXVsdCAocHJvcHMpID0+IChcbiAgPGRpdj5cbiAgICB7cHJvcHMubGlzdC5sZW5ndGggPiAwICYmIHByb3BzLmxpc3QubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8TGlzdEl0ZW0gY2xhc3NOYW1lPSdtYjInIGtleT17aXRlbS5faWQgfHwgYCR7aXRlbX0tJHtpfWB9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4LWF1dG8nPntpdGVtfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4LW5vbmUgbWwyJyBvbkNsaWNrPXsoKSA9PiBwcm9wcy5yZW1vdmUoaXRlbSl9PjxJY29uUmVtb3ZlIHRyYW5zbGF0ZT0nMCwgMicgLz48L2Rpdj5cbiAgICAgICAgPC9MaXN0SXRlbT5cbiAgICAgIClcbiAgICB9KX1cbiAgICA8QWRkSXRlbSB7Li4ucHJvcHN9IC8+XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgY2xhc3MgQWRkSXRlbSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgbmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGFkZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBwYXN0ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2NoZW1hOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIG1pblZhbGlkYXRpb25MZW5ndGg6IFByb3BUeXBlcy5udW1iZXJcbiAgfVxuICBzdGF0ZSA9IHsgdmFsdWU6ICcnIH1cbiAgb25DaGFuZ2UgPSAoZSkgPT4ge1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IGUudGFyZ2V0XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlIH0pXG4gIH1cbiAgb25QYXN0ZSA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIGlmICghdGhpcy5wcm9wcy5wYXN0ZSkgcmV0dXJuXG4gICAgY29uc3QgY2xpcGJvYXJkRGF0YSA9IGUuY2xpcGJvYXJkRGF0YSB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YVxuICAgIHRoaXMucHJvcHMub25QYXN0ZShjbGlwYm9hcmREYXRhLmdldERhdGEoJ1RleHQnKSlcbiAgfVxuICBvbkNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHRoaXMuc3RhdGVcbiAgICBpZiAodmFsdWUgPT09ICcnKSByZXR1cm4gY29uc29sZS5lcnJvcignbm8gdmFsdWUhJylcbiAgICB0aGlzLnByb3BzLmFkZCh0aGlzLnN0YXRlLnZhbHVlKVxuICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogJycgfSlcbiAgfVxuICBvbktleVByZXNzID0gKGUpID0+IHtcbiAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicgfHwgZS5rZXkgPT09ICdUYWInKSB7XG4gICAgICBpZiAoIXRoaXMucHJvcHMuc2NoZW1hKSByZXR1cm4gdGhpcy5vbkNsaWNrKClcbiAgICAgIHRoaXMucHJvcHMuc2NoZW1hLnZhbGlkYXRlKHRoaXMuc3RhdGUudmFsdWUsIChlcnIpID0+IHtcbiAgICAgICAgaWYgKCFlcnIpIHRoaXMub25DbGljaygpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc2NoZW1hLCBtaW5WYWxpZGF0aW9uTGVuZ3RoLCBuYW1lIH0gPSB0aGlzLnByb3BzXG4gICAgY29uc3QgaW5wdXRQcm9wcyA9IHtcbiAgICAgIG5hbWUsXG4gICAgICBvbkNoYW5nZTogdGhpcy5vbkNoYW5nZSxcbiAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnZhbHVlLFxuICAgICAgb25QYXN0ZTogdGhpcy5vblBhc3RlLFxuICAgICAgb25LZXlQcmVzczogdGhpcy5vbktleVByZXNzXG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleCBqdXN0aWZ5LWVuZCBpdGVtcy1jZW50ZXIgdy0xMDAgcHIyJz5cbiAgICAgICAge3RoaXMucHJvcHMuc2NoZW1hID8gPFZhbGlkYXRlZElucHV0IHNjaGVtYT17c2NoZW1hfSBtaW5WYWxpZGF0aW9uTGVuZ3RoPXttaW5WYWxpZGF0aW9uTGVuZ3RofSB7Li4uaW5wdXRQcm9wc30gLz4gOiA8SW5wdXQgey4uLmlucHV0UHJvcHN9IC8+fVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZmxleC1ub25lIHBvaW50ZXIgbWIyJyBvbkNsaWNrPXt0aGlzLm9uQ2xpY2t9PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT0nYmxhY2stNDAgZjYgc2VtaWJvbGQgbWgyIG1yMic+YWRkIGl0ZW08L3NwYW4+PEljb25QbHVzIHRyYW5zbGF0ZT0nMCwgMicgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhcnRpYWxzL3VzZXItY3JlYXRlLWxpc3QuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFHQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBSEE7O0FBSUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7OztBQUlBOzs7Ozs7Ozs7Ozs7OztBQVFBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7Ozs7OztBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBSkE7Ozs7Ozs7QUEvQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==