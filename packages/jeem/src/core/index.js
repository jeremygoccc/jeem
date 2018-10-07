import React from 'react'
import * as core from 'jeem-core'
import invariant from 'invariant'

const { Provider } = core

export default function () {

  let _router

  function router (router) {
    invariant(isFunction(router.default), `[app.router] router should be function, but got ${typeof router}`)
    _router = router.default
  }

  function start (container) {
    if (isString(container)) {
      container = document.querySelector(container)
      invariant(container, `[app.start] container ${container} not found`)
    }
  
    invariant(!container || isHTMLElement(container), `[app.start] container should be HTMLElement`)

    invariant(_router, `[app.start] router must be registered before app.start()`)
  
    const ReactDOM = require('react-dom')
    ReactDOM.render(React.createElement(getProvider(_router)), container)
  }

  return {
    ...core,
    router,
    start
  }
}

function getProvider(App) {
  const Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
  )
  return Root
}

const isString = str => typeof str === 'string'
const isHTMLElement = node => typeof node === 'object' && node !== null && node.nodeType && node.nodeName
const isFunction = f => typeof f === 'function'