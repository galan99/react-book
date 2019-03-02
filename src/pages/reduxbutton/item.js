import React , { Component } from 'react'
class Item extends Component {
  handleDel() {
    if(this.props.handleDel){
      this.props.handleDel()
    }
  }
  actionHandleDel() {
    if(this.props.onActionDel){
      this.props.onActionDel()
    }
  }
  render() {
    return (
      <div>
        <div className='comment'>
          <div className='comment-user'>
            <span>{this.props.comment.username} </span>：
          </div>
          <p style={{flex:1}}>{this.props.comment.content}</p>
          <p onClick={this.handleDel.bind(this)} style={{color: 'blue',paddingRight: '10px'}}>同步删除</p>
          <p onClick={this.actionHandleDel.bind(this)} style={{color: 'red',paddingRight: '10px'}}>异步删除</p>
        </div>
      </div>
    )
  }
}

export default Item