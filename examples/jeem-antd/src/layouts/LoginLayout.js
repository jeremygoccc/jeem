import React from 'react'

import WrappedNormalLoginForm from '../pages/Login'
import styles from './LoginLayout.less'

const LoginLayout = history => (
  <div className={styles.container}>
    <WrappedNormalLoginForm history={history} />
  </div>
)

export default LoginLayout
