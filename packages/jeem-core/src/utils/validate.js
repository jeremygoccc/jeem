export const validateAction = (action) => {
  if (!action || _typeof(action) !== 'object' || Array.isArray(action)) {
    throw new Error('Action must be an object!');
  }

  if (typeof action.type === 'undefined') {
    throw new Error('Action must have a type!');
  }
}

export const validateModel = (model, existModels) => {
  const { namespace } = model

  if (typeof namespace === 'undefined') {
    throw new Error('model must hava a namespace!');
  }

  if (typeof namespace !== 'string') {
    throw new Error(`namespace shoudle be string, but got ${typeof namespace}`);
  }

  if (existModels.some(model => model.namespace === namespace)) {
    throw new Error("namespace: ".concat(namespace, " repeated!"));
  }
}