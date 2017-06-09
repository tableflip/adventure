'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.releaseFormSchema = exports.preReleaseFormSchema = undefined;

var _joiBrowser = require('joi-browser');

var _joiBrowser2 = _interopRequireDefault(_joiBrowser);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// https://github.com/sindresorhus/semver-regex
var semverRegex = /\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?\b/ig;

var semverErrorMessage = {
  language: {
    string: {
      regex: {
        base: 'Please use a valid semver format i.e. 1.2.3 or v1.2.3-beta'
      }
    }
  }
};

var preReleaseFormSchema = exports.preReleaseFormSchema = {
  masterRepo: _joiBrowser2.default.string().required().label('Name of master repository'),
  repos: _joiBrowser2.default.array().items(_joiBrowser2.default.string()).label('Optional other repos'),
  emails: _joiBrowser2.default.array().items(_joiBrowser2.default.string().email()).min(1).required().label('Tester\'s emails'),
  deployment: _joiBrowser2.default.string().uri().required().label('Deployment URL'),
  workplan: _joiBrowser2.default.string().uri().required().label('Workplan URL'),
  version: _joiBrowser2.default.string().regex(semverRegex).label('Version number').options(semverErrorMessage),
  instructions: _joiBrowser2.default.string().allow('').allow(null).label('Instructions for testers')
};

var releaseFormSchema = exports.releaseFormSchema = {
  masterRepo: _joiBrowser2.default.string().required().label('Name of master repository'),
  repos: _joiBrowser2.default.array().items(_joiBrowser2.default.string()).label('Optional other repos'),
  deployment: _joiBrowser2.default.string().uri().required().label('Deployment URL'),
  workplan: _joiBrowser2.default.string().uri().required().label('Workplan URL'),
  version: _joiBrowser2.default.string().regex(semverRegex).label('Version number').options(semverErrorMessage)
};