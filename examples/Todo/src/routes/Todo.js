import React from 'react'
import { connect } from 'jeem-core'
import { Layout, Button, Input, List, Checkbox} from 'antd'
import styles from './Todo.less'

console.log(styles)

const { Content } = Layout

function Todo ({ list }) {
  let input
  return (
   <Layout className={styles.layout}>
    <h1>
      TodoList
      <small> (in jeem)</small>
    </h1>
    <Content>
      <Input 
        placeholder="请输入待办事项" 
        value={input}
        onChange={e => input = e.target.value}
      />
      <Button type="primary" icon="plus"
        onClick={() => { dispatch.todo.add({ name: input.value, status: false }); input.value = '' }}
      >
        新增
      </Button>
      <List 
        className={styles.list}
        bordered
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item>
            <Checkbox
              checked={item.status}
              onChange={e => dispatch.todo.check({ index, value: e.target.checked })}
            >
              {item.name}
            </Checkbox>
            <Button
              className={styles.btndel}
              type="danger" size="small" shape="circle" icon="close"
              onClick={() => dispatch.todo.del(index)}
            />
          </List.Item>
        )}
      />
    </Content>
   </Layout> 
  )
}

const mapStateToProps = state => ({
  list: state.todo.list
})

const TodoContainer = connect(mapStateToProps)(Todo)

export default TodoContainer
