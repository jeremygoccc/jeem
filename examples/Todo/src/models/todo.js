export default {
  namespace: 'todo',
  state: {
    list: [{
      name: '吃饭',
      status: true
    }, {
      name: '睡觉',
      status: true
    }, {
      name: '打豆豆',
      status: true
    }]
  },
  reducers: {
    add(state, payload) {
      console.log(payload)
      console.log(state.list.concat(payload))
      return {
        ...state,
        list: state.list.concat(payload)
      }
    },
    check(state, payload) {
      const { index, value } = payload
      const newState = Object.assign({}, state.list)
      newState[index].status = value
      return {
        ...state,
        list: newState
      }
    },
    del(state, index) {
      const newList = state.list.filter((list, i) => i !== index)
      return {
        ...state,
        list: newList
      }
    }
  }
}