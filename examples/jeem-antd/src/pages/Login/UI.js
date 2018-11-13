import React from 'react'
import { Link } from 'jeem/router'
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd'
import logo from '../../assets/Front-Logo.png'
import styles from './UI.less'

const FormItem = Form.Item

const NormalLoginForm = (props) => {
  const { getFieldDecorator } = props.form
  const { user, onLogin } = props
  const handleSubmit = (e) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        onLogin({ ...values })
      }
    })
  }
  return (
      <Form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.header}>
          <Link to="/">
            <img src={logo} className={styles.logo} alt="logo" />
            <span className={styles.title}>Homyit Studio</span>
          </Link>
        </div>
        <FormItem>
          {
            getFieldDecorator('username', { initialValue: user.username }, {
              rules: [{ required: true, message: 'Please input your username' }],
            })(
              <Input
                prefix={<Icon type='user' style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                placeholder='username'
              />,
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('password', { initialValue: user.password }, {
              rules: [{ required: true, message: 'Please input your password' }],
            })(
              <Input
                prefix={<Icon type='lock' style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                type='password'
                placeholder='password'
              />,
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>,
            )
          }
          <a className={styles.forget} href=''></a>
          <Button
            type='primary'
            htmlType='submit'
            className={styles.button}
          >
            Log in
          </Button>
          Or <a href=''>register now!</a>
        </FormItem>
      </Form>
  )
}

export default Form.create()(NormalLoginForm)
