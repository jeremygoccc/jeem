import jeem from 'jeem';
import global from './models/global'
import todo from './pages/Admin/Todo/models/todo';
import user from './pages/Login/models/user'

const app = jeem();

app.init({
  models: {
    global,
    todo,
    user,
  },
});

app.router(require('./router'));

app.start('#app');

module.hot && module.hot.accept();
