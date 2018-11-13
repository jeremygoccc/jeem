import React from 'react';
import { List, Checkbox, Button } from 'antd';
import styles from './list.less';

const Lists = ({ list, onChange, onDel }) => (
  <List
    className={styles.list}
    bordered
    dataSource={list}
    renderItem={(item, index) => (
      <List.Item>
        <Checkbox
          checked={item.status}
          onChange={e => onChange({ index, value: e.target.checked })}
        >
          {item.name}
        </Checkbox>
        <Button
          className={styles.btndel}
          type="danger" size="small" shape="circle" icon="close"
          onClick={() => onDel(index)}
        />
      </List.Item>
    )}
  />
);

export default Lists;
