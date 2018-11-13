import { message } from 'antd'
import { history } from 'jeem/router'

export default {
  namespace: 'user',
  state: {
    userOne: {
      username: '123',
      password: '123',
    },
  },
  reducers: {},
  effects: {
    async login(state, payload) {
      const { username, password } = payload
      console.log(username, password)
      if (username !== '123' || password !== '123') {
        message.error('账号或密码错误!')
      } else {
        message.success('登录成功!')
        await new Promise(resolve => setTimeout(resolve, 1000))
        history.push('/Admin/Todo')
      }
    },
  },
}
