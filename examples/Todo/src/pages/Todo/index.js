import { connect } from 'jeem';
import Todo from '../../component/todo';

const mapStateToProps = state => ({
  list: state.todo.list,
});

const mapDispatchToProps = dispatch => ({
  onAdd: ({ name, status }) => dispatch.todo.add({ name, status }),
  onChange: ({ index, value }) => dispatch.todo.check({ index, value }),
  onDel: index => dispatch.todo.del(index),
  onAddAsync: ({ name, status, delay }) => dispatch.todo.addAsync({ name, status, delay }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
