import jeem from 'jeem'
import todo from './models/todo'

const app = jeem()

app.init({
  models: {
    todo
  }
})

app.router(require('./router'))

app.start('#app')

module.hot && module.hot.accept()
