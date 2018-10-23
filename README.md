# jeem
jeem 是一个拥有完全轻量的核心，可以更高效地创建react应用的微型框架

### 理念

前端界面的展现就是 state + view：react -> view &&  jeem -> state

### 核心API

- init: store setup (*)　依据model初始化全局store
- router: router register 路由注册
- start: node mount 　节点渲染

最小代码结构:

```js
import jeem from 'jeem'

const app = jeem()

app.init(/*your model*/)

app.router(/*your router*/)

app.start(/*your node*/)
```

### model

- namespace: store's key  
- state
- reducers: one reducer - one action　改变state
- effects: async actions　所有与外界相关的操作->同步触发reducers
- ......

One template:

```js
export default {
  namespace: 'todo',
  state: {
    list: [{
      name: '吃饭',
      status: true
    }, {
      name: '睡觉',
      status: true
    }, {
      name: '打豆豆',
      status: true
    }]
  },
  reducers: {
    add(state, payload) {
      return {
        ...state,
        list: state.list.concat(payload)
      }
    }
  },
  effects: {
    async addAsync(state, payload) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      dispatch.todo.add({ name: payload.name, status: payload.status })
    }
  }
}
```

在 view 中如何改变 state (call reducers) ?

```js
dispatch.modelNamespace.reducerName/effectName(payload)
```

如何将 view 与 state 相关联 ?

```js
import { connect } from 'jeem'

const mapStateToProps = state => ({
  list: state.todo.list
})

const mapDispatchToProps = dispatch => ({
  onAdd: ({ name, status }) => dispatch.todo.add({ name, status }),
  onAddAsync: ({ name, status }) => dispatch.todo.addAsync({ name, status })
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
```

connect 之后 state 改变就会自动触发 view 的改变

### 目录结构

```
|--- build          # webpack配置目录
|--- src
  |--- component    # 组件目录
  |--- constants    # 常量定义目录
  |--- models       # model目录
  |--- routes       # state-view关联目录 connect()
  |--- service      # api目录
  |--- index.css
  |--- index.html
  |--- index.js     # app初始化
  |--- router.js    # 路由文件
|--- package.json
|--- webpack.config.js
```



### 开始

这里提供了一个脚手架工具用来快速生成 jeem 项目(安装依赖推荐使用yarn):

```
npm install jeem-cli -g

jeem new my-jeem-app

cd my-jeem-app && yarn && yarn dev
```

同时提供了一个示例模板:

```
jeem new jeem-demo --demo
```

yarn dev 以后访问 http://localhost:8080 出现 TodoList 即可参照进行开发

### 对比

jeem 灵感的来源: [dva](https://github.com/dvajs/dva) + [rematch](https://github.com/rematch/rematch)

两大框架(个人觉得)存在的局限性:

- dva: redux + react-router + redux-saga结合性方案, redux + redux-saga 理解的曲线偏陡峭
- rematch: 基于redux的插件机制, 本身还是为了针对已经成型的redux项目过渡做了比较多hack

jeem的特点:

- 完全轻量的核心, 只暴露出 Provider & connect 针对 view + state 操作所需的最小 api, 其余模块完全基于es6(7)
- 核心专注于 state , 上层内置 react-router + antd + fetch 用来处理 路由 UI 与 数据请求

目前 jeem 已经可以完成一个 react app从开发到编译打包上线的整体流程

### Todo

- 增加model的subscriptions: 有些情形采用订阅数据源的方式会更合适(keyboard输入 history路由变化等等)
- 支持state操作过程中的middleware: reducers中不宜做过多判断
- 增加路由约定(参考umi约定即路由), 优化现有目录结构
- 优化 webpack 配置，提升 start 开发以及 build 上线整体体验
- 支持插件化的机制(maybe...)
- Typescript重构(maybe too...)
- more...

Welcome to create a issue or pr for promoting jeem !
