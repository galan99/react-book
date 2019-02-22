// 留言功能
import React, { Component } from 'react'
import CommentInput from './cominput'
import CommentList from './comlist'

class Mybtn extends Component {
  constructor() {
    super()
    this.state = {
      list: []
    }
  }
  handleSub(val) {
    if (!val) return
    if (!val.username) return alert('请输入用户名')
    if (!val.content) return alert('请输入评论内容')
    this.state.list.push(val)
    this.setState({
      list: this.state.list
    })
  }

  render () {
    return (
      <div>
        <CommentInput onSubmit={this.handleSub.bind(this)}/>
        <CommentList comments={this.state.list}/>
      </div>
    )
  }
}

export default Mybtn