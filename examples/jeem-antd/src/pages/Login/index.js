import { connect } from 'jeem'
import WrappedNormalLoginForm from './UI'

const mapStateToProps = state => ({
  user: state.user.userOne,
})

const mapDispatchToProps = dispatch => ({
  onLogin: ({ username, password, remember }) => dispatch.user.login({ username, password, remember }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)
