import { validateModel } from "../utils/validate";

const app = {
  _models: [], // one model to one secene
  _store: {},
  _subscribers: [],
  dispatch: {},
  init
};

const initModel = {
  namespace: '@@jeem',
  state: {}
}

function init(model = {
  models: {
    initModel
  }
}) {
  const { models } = model
  const dispatch = {}

  if (typeof models !== 'undefined') {
    for (let key in models) {
      const _model = models[key]
      validateModel(_model, app._models);
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
  let state = model.state;

  const coreDispatch = name => action => {
      if (typeof name !== 'undefined') { // chained call dispatch
        const { reducers, effects } = model
        let callFlag = false;
        for (let key in reducers) {
          if (key === name) {
            state = reducers[name](state, action);
            callFlag = true;
            break;
          }
        }
        if (!callFlag) {
          for (let _key in effects) {
            if (_key === name) {
              effects[name](state, action);
              callFlag = true;
              break;
            }
          }
        }

        if (!callFlag) throw new Error("model: ".concat(model, " reducers or effects not found!"));
        app._subscribers.forEach(handler => handler())
      } 
      // validateAction(action)
      // if (typeof model.reducers[action.type] !== 'undefined') {  // reducers or effects
      //   state = model.reducers[action.type](state, action.payload)
      // } else {
      //   state = model.effects[action.type](state, action.payload)
      // }
      // app._subscribers.forEach(handler => handler())
  };
  const getState = () => state
  const store = {
    dispatch: coreDispatch,
    getState
  };
  return store;
}

function ejectDispatch(model, store) { // support dispatch.modelNamespace.reducersName/effectsName(payload)
  const { namespace, reducers, effects } = model
  let dispatch = {};
  if (typeof reducers !== 'undefiend') {
    for (let key in reducers) {
      const reducer = reducers[key];
      dispatch[reducer.name] = store[namespace].dispatch(reducer.name);
    }
  }
  if (typeof effects !== 'undefined') {
    for (let key in effects) {
      const effect = effects[key];
      dispatch[effect.name] = store[namespace].dispatch(effect.name);
    }
  }

  return dispatch;
}

function getState() {
  let allState = {};
  for (let key in app._store) {
    if (~app._models.indexOf(key)) {
      allState[key] = app._store[key].getState(); // get the reactive state
    }
  }

  return allState;
}

function subscribe(handler) {
  app._subscribers.push(handler);
  return () => {
    const index = app._subscribers.indexOf(handler);
    if (index > 0) {
      app._subscribers.splice(index, 1);
    }
  }
}

export default init