import React from 'react'
import { connect } from 'jeem-core'

const UserApp = ({ users }) => (
  <ul>
    {Object.keys(users).map(id => 
      <li key={id}>{users[id].name}</li>
    )}
  </ul>
)

const mapStateToProps = state => ({
  users: state.user.users
})

const UserAppContainer = connect(mapStateToProps)(UserApp)

export default UserAppContainer