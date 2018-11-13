export default {
  namespace: 'todo',
  state: {
    list: [{
      name: '吃饭',
      status: true,
    }, {
      name: '睡觉',
      status: true,
    }, {
      name: '打豆豆',
      status: true,
    }],
  },
  reducers: {
    add(state, payload) {
      return {
        ...state,
        list: state.list.concat(payload),
      };
    },
    check(state, payload) {
      const { index, value } = payload;
      const newState = JSON.parse(JSON.stringify(state.list));
      newState[index].status = value;
      return {
        ...state,
        list: newState,
      };
    },
    del(state, index) {
      const newList = state.list.filter((t, i) => i !== index);
      return {
        ...state,
        list: newList,
      };
    },
  },
  effects: {
    async addAsync(state, payload) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch.todo.add({ name: payload.name, status: payload.status });
    },
  },
};
