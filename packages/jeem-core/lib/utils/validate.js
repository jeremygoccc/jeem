"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateModel = exports.validateAction = void 0;

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

var validateAction = function validateAction(action) {
  if (!action || _typeof(action) !== 'object' || Array.isArray(action)) {
    throw new Error('Action must be an object!');
  }

  if (typeof action.type === 'undefined') {
    throw new Error('Action must have a type!');
  }
};

exports.validateAction = validateAction;

var validateModel = function validateModel(model, existModels) {
  var namespace = model.namespace;

  if (typeof namespace === 'undefined') {
    throw new Error('model must hava a namespace!');
  }

  if (typeof namespace !== 'string') {
    throw new Error("namespace shoudle be string, but got ".concat(_typeof2(namespace)));
  }

  if (existModels.some(function (model) {
    return model.namespace === namespace;
  })) {
    throw new Error("namespace: ".concat(namespace, " repeated!"));
  }
};

exports.validateModel = validateModel;