// 留言功能
import React, { Component } from 'react'
import CommentInput from './cominput'
import CommentList from './comlist'

class Mybtn extends Component {
  render () {
    return (
      <div>
        <CommentInput/>
        <CommentList/>
      </div>
    )
  }
}

export default Mybtn