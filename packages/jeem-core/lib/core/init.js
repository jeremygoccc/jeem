"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = require("../utils/validate");

var app = {
  _models: [],
  // one model to one secene
  _store: {},
  _subscribers: [],
  dispatch: {},
  init: init
};

function init(model) {
  var models = model.models;
  var dispatch = {};

  if (typeof models !== 'undefined') {
    for (var key in models) {
      var _model = models[key];
      (0, _validate.validateModel)(_model, app._models);

      app._models.push(_model.namespace);

      app._store[_model.namespace] = injectStore(_model);
      dispatch[_model.namespace] = ejectDispatch(_model, app._store);
    }
  }

  app._store.getState = getState;
  app._store.subscribe = subscribe;
  app._store.dispatch = window.dispatch = dispatch;
  window.store = app._store;
  return app._store;
}

function injectStore(model) {
  var state = model.state;

  var coreDispatch = function coreDispatch(name) {
    return function (action) {
      if (typeof name !== 'undefined') {
        // chained call dispatch
        var reducers = model.reducers,
            effects = model.effects;
        var callFlag = false;

        for (var key in reducers) {
          if (key === name) {
            state = reducers[name](state, action);
            callFlag = true;
            break;
          }
        }

        if (!callFlag) {
          for (var _key in effects) {
            if (_key === name) {
              state = effects[name](state, action);
              callFlag = true;
              break;
            }
          }
        }

        if (!callFlag) throw new Error("model: ".concat(model, " reducers or effects not found!"));

        app._subscribers.forEach(function (handler) {
          return handler();
        });
      } // validateAction(action)
      // if (typeof model.reducers[action.type] !== 'undefined') {  // reducers or effects
      //   state = model.reducers[action.type](state, action.payload)
      // } else {
      //   state = model.effects[action.type](state, action.payload)
      // }
      // app._subscribers.forEach(handler => handler())

    };
  };

  var getState = function getState() {
    return state;
  };

  var store = {
    dispatch: coreDispatch,
    getState: getState
  };
  return store;
}

function ejectDispatch(model, store) {
  // support dispatch.modelNamespace.reducersName/effectsName(payload)
  var namespace = model.namespace,
      reducers = model.reducers,
      effects = model.effects;
  var dispatch = {};

  if (typeof reducers !== 'undefiend') {
    for (var key in reducers) {
      var reducer = reducers[key];
      dispatch[reducer.name] = store[namespace].dispatch(reducer.name);
    }
  }

  if (typeof effects !== 'undefined') {
    for (var _key2 in effects) {
      var effect = effects[_key2];
      dispatch[effect.name] = store[namespace].dispatch(effect.name);
    }
  }

  return dispatch;
}

function getState() {
  var allState = {};

  for (var key in app._store) {
    if (~app._models.indexOf(key)) {
      allState[key] = app._store[key].getState(); // get the reactive state
    }
  }

  return allState;
}

function subscribe(handler) {
  app._subscribers.push(handler);

  return function () {
    var index = app._subscribers.indexOf(handler);

    if (index > 0) {
      app._subscribers.splice(index, 1);
    }
  };
}

var _default = init;
exports.default = _default;