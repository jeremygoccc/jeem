import React from 'react'
import Loadable from 'react-loadable'

import Dashboard from '../pages/Admin/Dashboard'
import Alex from '../pages/Admin/User/Alex'
import Bill from '../pages/Admin/User/Bill'

function Loading({ error }) {
  if (error) {
    return 'Oh nooess!';
  }
  return <h3>Loading...</h3>;
}

const Todo = Loadable({
  loader: () => import('../pages/Admin/Todo'),
  loading: Loading,
})

export default [
  {
    path: '/Admin/Dashboard',
    name: 'Dashboard',
    icon: 'pie-chart',
    component: Dashboard,
  },
  {
    path: '/Admin/User',
    name: 'User',
    icon: 'user',
    routes: [
      {
        path: '/Admin/User/Bill',
        name: 'Bill',
        component: Bill,
      },
      {
        path: '/Admin/User/Alex',
        name: 'Alex',
        component: Alex,
      },
    ],
  },
  {
    path: '/Admin/Todo',
    name: 'Todo',
    icon: 'file',
    component: Todo,
  },
]
