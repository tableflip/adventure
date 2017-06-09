'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _jsxFileName = '/Users/bernardmordan/Code/adventure/outro/partials/pre-release-form.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _joiBrowser = require('joi-browser');

var _joiBrowser2 = _interopRequireDefault(_joiBrowser);

var _components = require('../components');

var _userCreateList = require('./user-create-list');

var _userCreateList2 = _interopRequireDefault(_userCreateList);

var _schemas = require('../schemas');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var PreReleaseForm = function (_Component) {
  (0, _inherits3.default)(PreReleaseForm, _Component);

  function PreReleaseForm() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, PreReleaseForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PreReleaseForm.__proto__ || (0, _getPrototypeOf2.default)(PreReleaseForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      formData: {
        masterRepo: '',
        repos: [],
        emails: [],
        deployment: '',
        workplan: '',
        version: '',
        instructions: ''
      }
    }, _this.onAdd = function (field, item) {
      var value = [].concat((0, _toConsumableArray3.default)(_this.state.formData[field]), [item]);
      _this.updateField(field, value);
    }, _this.onRemove = function (field, item) {
      var items = [].concat((0, _toConsumableArray3.default)(_this.state.formData[field]));
      var index = items.indexOf(item);
      if (index < 0) return console.error('can not find ' + item + ' in repos');
      items.splice(index, 1);
      _this.updateField(field, items);
    }, _this.onChange = function (e) {
      var _e$target = e.target,
          name = _e$target.name,
          value = _e$target.value;

      _this.updateField(name, value);
    }, _this.onPaste = function (field, value) {
      var items = value.trim().replace(/\s/g, '').split(/;|,/g);
      _this.updateField(field, items);
    }, _this.onSubmit = function () {
      var formData = _this.state.formData;

      _joiBrowser2.default.validate(formData, _joiBrowser2.default.object(_schemas.preReleaseFormSchema), function (error, value) {
        if (error) return console.error(error);
        _this.props.onSubmit({ formData: formData });
      });
    }, _this.updateField = function (field, value) {
      var formData = (0, _assign2.default)({}, _this.state.formData, (0, _defineProperty3.default)({}, field, value));
      _this.setState({ formData: formData });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(PreReleaseForm, [{
    key: 'render',
    value: function render() {
      var onChange = this.onChange,
          state = this.state,
          onAdd = this.onAdd,
          onRemove = this.onRemove,
          onPaste = this.onPaste,
          onSubmit = this.onSubmit;
      var _state$formData = state.formData,
          masterRepo = _state$formData.masterRepo,
          repos = _state$formData.repos,
          emails = _state$formData.emails,
          deployment = _state$formData.deployment,
          workplan = _state$formData.workplan,
          version = _state$formData.version,
          instructions = _state$formData.instructions;

      return _react2.default.createElement('form', { action: '/', method: 'post', __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        }
      }, _react2.default.createElement(_components.ValidatedInput, {
        name: 'masterRepo',
        label: 'Name of master repository',
        onChange: onChange,
        value: masterRepo,
        autoFocus: true,
        schema: _schemas.preReleaseFormSchema.masterRepo, __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        }
      }), _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      }, _react2.default.createElement(_userCreateList2.default, {
        label: 'Other repos (optional)',
        name: 'repos',
        remove: onRemove.bind(null, 'repos'),
        add: onAdd.bind(null, 'repos'),
        list: repos,
        paste: onPaste.bind(null, 'repos'), __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        }
      })), _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        }
      }, _react2.default.createElement('label', { htmlFor: 'emails', className: 'f6 b db mb2', __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        }
      }, 'Testers emails'), _react2.default.createElement(_userCreateList2.default, {
        name: 'emails',
        remove: onRemove.bind(null, 'emails'),
        add: onAdd.bind(null, 'emails'),
        list: emails,
        paste: onPaste.bind(null, 'emails'),
        schema: _joiBrowser2.default.string().email().allow(''),
        minValidationLength: 7, __source: {
          fileName: _jsxFileName,
          lineNumber: 80
        }
      })), _react2.default.createElement(_components.ValidatedInput, {
        name: 'deployment',
        label: 'Deployment URL',
        onChange: onChange,
        value: deployment,
        schema: _schemas.preReleaseFormSchema.deployment,
        minValidationLength: 7, __source: {
          fileName: _jsxFileName,
          lineNumber: 89
        }
      }), _react2.default.createElement(_components.ValidatedInput, {
        name: 'workplan',
        label: 'Workplan URL',
        onChange: onChange,
        value: workplan,
        schema: _schemas.preReleaseFormSchema.workplan,
        minValidationLength: 7, __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        }
      }), _react2.default.createElement(_components.ValidatedInput, {
        name: 'version',
        label: 'Version number',
        onChange: onChange,
        value: version,
        schema: _schemas.preReleaseFormSchema.version, __source: {
          fileName: _jsxFileName,
          lineNumber: 103
        }
      }), _react2.default.createElement(_components.Textarea, { name: 'instructions', label: 'Instructions for testers', onChange: onChange, value: instructions, __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        }
      }), _react2.default.createElement('div', { className: 'pv2', __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        }
      }, _react2.default.createElement(_components.Button, { type: 'button', children: 'Create Pre Release', onClick: onSubmit, __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        }
      })));
    }
  }]);
  return PreReleaseForm;
}(_react.Component);

exports.default = PreReleaseForm;