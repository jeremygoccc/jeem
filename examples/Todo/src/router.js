import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Note from './routes/Note'
import User from './routes/User'
// import Todo from '/routes/Todo'

const App = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Go to Todo</Link>
        </li>
        <li>
          <Link to="/user">Go to User</Link>
        </li>
        <li>
          <Link to="/note">Go to Note</Link>
        </li>
      </ul>

      <hr />

      {/* <Route exact path="/" component={Todo} /> */}
      <Route path="/user" component={User} />
      <Route path="/" component={Note} />
    </div>
  </Router>
)

export default App