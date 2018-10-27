import jeem from 'jeem';
import todo from './pages/Todo/models/todo';

const app = jeem();

app.init({
  models: {
    todo,
  },
});

app.router(require('./router'));

app.start('#app');

module.hot && module.hot.accept();
