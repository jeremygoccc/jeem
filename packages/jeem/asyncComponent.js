import React, { Component } from 'react'

export default function asyncComponent(importComponentFunc) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)

      this.state = {
        component: null
      }
    }

    async componentDidMount () {
      const { default: component } = await importComponentFunc()

      this.setState({
        component
      })
    }

    redner () {
      const Component = this.state.component

      return Component
        ? <Component {...this.props} />
        : null
    }
  }

  return AsyncComponent
}