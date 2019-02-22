import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Demo from '@src/pages/demo'
import Index from '@src/pages/xiaoshu'
import Mybtn from '@src/pages/button'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <ul>
              <li>
                <Link to="/">首页</Link>
              </li>
              <li>
                <Link to="/index">小书</Link>
              </li>
              <li>
                <Link to="/btn">button页面</Link>
              </li>
            </ul>
          </div>
          <br/>
          <br/>
          <Route path="/" exact component={Demo}/>
          <Route path="/index" exact component={Index}/>
          <Route path="/btn" exact component={Mybtn}/>
        </div>
      </Router>
    );
  }
}

export default App;