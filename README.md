## [react小书介绍](http://huziketang.mangojuice.top/books/react/lesson25)

### 创建项目

creat-reat-app project

### 初始化package.json文件

npm run eject

### npm start

启动项目

### npm run build

项目打包

<br/>
<br/>


### 使用绝对导入静态资源

webpack.config.js里配置resolve里的alias配置<br/>
'@src': path.resolve(__dirname, '../src')<br/>
'@src': __dirname + '../src'<br/>


# react使用说明

因为class和for都是js的关键字要改成className、htmlFor
<label htmlFor='sex'>
  <input type="radio" value="boy" name="sex">
</label>

绑定class
className={['rules', this.state.lookRule?'show':''].join(' ')}

行间样式
```code
<h3 style={{color: '#ffff'}}>红包个数(个)</h3>
```

img引入图片
import imgURL from '@src/assets/img/bg.jpg'
<img src={imgURL}/>

<img src={require('@src/assets/img/bg.jpg')} />

jsx注释
{/*这是正确的注释*/}

a标签默认不允许设置href:javascript的
要先把package.json里的"eslintConfig": {"extends": "airbnb"}删除

然后在根目录下新建 .eslintrc 文件针对整个项目做一个标准的规范
```code
{
  "extends": "react-app",
  "rules": {
    "semi": [0],
    "react/jsx-filename-extension": [0],
    "jsx-a11y/anchor-is-valid": [0]
  }
}
```

setDate  并不会马上修改
```code
handleClickOnLikeButton () {
    this.setState({ count: 0 }) // => this.state.count 还是 undefined
    this.setState({ count: this.state.count + 1}) // => undefined + 1 = NaN
    this.setState({ count: this.state.count + 2}) // => NaN + 2 = NaN
}
```

setState 的第二种使用方式，可以接受一个函数作为参数

```code
  handleClickOnLikeButton () {
    this.setState((prevState) => {
      return { count: 0 }
    })
    this.setState((prevState) => {
      return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
    })
    this.setState((prevState) => {
      return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
    })
    // 最后的结果是 this.state.count 为 3
  }
```

props

为了使得组件的可定制性更强，在使用组件的时候，可以在标签上加属性来传入配置参数。
组件可以在内部通过 this.props 获取到配置参数，组件可以根据 props 的不同来确定自己的显示形态，达到可配置的效果。
可以通过给组件添加类属性 defaultProps 来配置默认参数。
props 一旦传入，你就不可以在组件内部对它进行修改。但是你可以通过父组件主动重新渲染的方式来传入新的 props，从而达到更新的效果。

### 获取dom操作 ref指令
class AutoFocusInput extends Component {
  componentDidMount () {
    this.input.focus()
  }

  render () {
    return (
      <input ref={(input) => this.input = input} />
    )
  }
}

### 将带标签的字符串转义为html解析
<p dangerouslySetInnerHTML={{ __html: value.content }}  />

### props验证
```code
npm install --save prop-types
import React, { Component } from 'react'
import PropTypes from 'prop-types'

PropTypes.object.isRequired 必须传的参数
PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number
PropTypes.object
PropTypes.string
PropTypes.node
PropTypes.element

class Comment extends Component {
  // props类型 需要引入prop-types包
  static propTypes = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
  }

  // 默认 props数据
  static defaultProps = {
    comments: []
  }
  
  render () {
    const { comment } = this.props
    return (
      <div className='comment'>
        <p>{comment.content}</p>
      </div>
    )
  }
}
```



### 使用less
npm install less less-loader --save-dev

```code
在webpack.config.js修改
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

然后在module字段里添加以下配置
// 添加less功能
{
    test: lessRegex,
    exclude: lessModuleRegex,
    use: getStyleLoaders({ importLoaders: 3 }, 'less-loader'),
},
{
    test:lessModuleRegex,
    use: getStyleLoaders(
        {
            importLoaders: 3,
            modules: true,
            getLocalIdent: getCSSModuleLocalIdent,
        },
        'less-loader'
    ),
},
```

# React Router4使用说明
npm install --save react-router-dom
react-router-dom 版本4<br/>
```code
import { BrowserRouter as Router, Route, Link } from "react-router-dom"<br/>
BrowserRouter, hashHistory两种模式 <br/>
```

<Route path="/" exact component={Demo}/> exact 是避免/跟其他路由冲突

# redux教程

通过connect将ui与store关联
```code
// Input.jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Item from './item'
import { deleteComment, deleteAction } from '@src/store/reducer'
// import './item.less'
class CommentList extends Component {
  static propTypes = {
    list: PropTypes.array,
    onDel: PropTypes.func,
    onActionDel: PropTypes.func,
  }

  handleDelItem(index){
    console.log(index)
    this.props.onDel(index)
    
  }

  onActionDel(index){
    this.props.onActionDel(index)
  }

  render() {
    return (
      <div>
        { this.props.list.map((item, i) => <Item onActionDel={this.onActionDel.bind(this, i)} handleDel={this.handleDelItem.bind(this, i)} comment={item} key={i} />) }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDel: (comment) => {
      dispatch(deleteComment(comment))
    },
    onActionDel: (comment) => {
      dispatch(deleteAction(comment))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList)

```

> 主代码

```code
// main.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Demo from '@src/pages/demo'
import Mybtn from '@src/pages/button'
import ReduxBtn from '@src/pages/reduxbutton'
import reducer from '@src/store/reducer'

//创建store
const middleware = [thunk]
const store = createStore(reducer, applyMiddleware(...middleware))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <div>
              <ul>
                <li>
                  <Link to="/">首页</Link>
                </li>
                <li>
                  <Link to="/btn">普通版本留言</Link>
                </li>
                <li>
                  <Link to="/redux">redux版本留言</Link>
                </li>
              </ul>
            </div>
            <br/>
            <br/>
            <Route path="/" exact component={Demo}/>
            <Route path="/btn" component={Mybtn}/>
            <Route path='/redux' component={ReduxBtn}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
```

> reducer.js

```code
// reducer.js
// action types
const INIT_COMMENTS = 'INIT_COMMENTS'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

// 同步actions
export const initComments = (comments) => {
  return { type: INIT_COMMENTS, comments }
}

export const addComment = (comment) => {
  return { type: ADD_COMMENT, comment }
}

export const deleteComment = (index) => {
  return { type: DELETE_COMMENT, index }
}


// 异步actions
export const deleteAction = (index) => (dispatch) => {
  console.log('异步请求redux')
  setTimeout(() => {
    dispatch({ type: DELETE_COMMENT, index })
  }, 2000);
}

let initStates = { 
  list: [
    {username: '初始名字', content: '初始内容'}
  ]
}

//这是reducer
const reducer = (state = initStates, action) => {
    switch (action.type) {
        case 'INIT_COMMENTS':
          // 初始化评论
          return { list: action.comments }
        case 'ADD_COMMENT':
          // 新增评论
          return {
            list: [...state.list, action.comment]
          }
        case DELETE_COMMENT:
          // 删除评论
          return {
            list: [
              ...state.list.slice(0, action.index),
              ...state.list.slice(action.index + 1)
            ]
          }
        default:
          return state;
    }
}
export default reducer
```