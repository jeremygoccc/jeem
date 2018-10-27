import React from 'react';
import {
  Layout, Button, Row, Col,
} from 'antd';
import Lists from './list';

import styles from './todo.less';

const { Content } = Layout;

const Todo = ({
  list, onAdd, onChange, onDel, onAddAsync,
}) => {
  let input;
  return (
   <Layout className={styles.layout}>
    <h1>
      TodoList
    </h1>
    <Content>
      <Row gutter={16}>
        <Col>
          <input
            type="text"
            className='ant-input'
            placeholder="请输入待办事项"
            ref={node => input = node}
          />
          <Button type="primary" icon="plus"
            onClick={() => { input.value && onAdd({ name: input.value, status: false }); input.value = ''; }}
          >
            新增
          </Button>
          <Button type="default" icon="plus"
            onClick={() => { input.value && onAddAsync({ name: input.value, status: false }); input.value = ''; }}
          >
            延迟新增
          </Button>
        </Col>
      </Row>
      <Lists
        list={list}
        onChange={onChange}
        onDel={onDel}
      />
      <p className={styles.pra}>Created By Jeem</p>
    </Content>
   </Layout>
  );
};

export default Todo;
