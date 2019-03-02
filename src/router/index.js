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