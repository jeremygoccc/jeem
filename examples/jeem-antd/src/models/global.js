export default {
  namespace: 'global',
  state: {
    collapsed: false,
  },
  reducers: {
    onCollapse(state, payload) {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },
};
