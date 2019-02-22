import React, { Component } from 'react'
import Item from './item'
// import './item.less'
class CommentList extends Component {
  static defaultProps = {
    comments: []
  }
  
  render() {
    return (
      <div>
        { this.props.comments.map((item, i) => <Item comment={item} key={i} />) }
      </div>
    )
  }
}

export default CommentList