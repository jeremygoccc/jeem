import React from 'react'
import ReactDOM from 'react-dom'
import { init, Provider } from 'jeem-core'
import note from './models/note'
import user from './models/user'
import todo from './models/todo'

import App from './router'

const store = init({
  models: {
    note, 
    user,
    todo
  }
})

// app.start('#app')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept();
}
