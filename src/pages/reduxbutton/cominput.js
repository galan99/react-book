import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment as addRedux } from '@src/store/reducer'

class CommentInput extends Component {
  static propTypes = {
    list: PropTypes.array,
    onSub: PropTypes.func
  }

  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }
  componentWillMount () {
    this._loadUsername()
  }

  _loadUsername () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  handleUsernameChange(e){
    this.setState({
      username: e.target.value
    })
  }

  handleContentChange(e){
    this.setState({
      content: e.target.value
    })
  }

  submit(ev){
    const { username, content } = this.state
    if (!username) return alert('请输入用户名')
    if (!content) return alert('请输入评论内容')
    if (this.props.onSub) {
      this.props.onSub({username, content})
    }
    this.setState({ content: '' })
  }

  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input 
              value={this.state.username} 
              onChange={this.handleUsernameChange.bind(this)} />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea 
              value={this.state.content} 
              onChange={this.handleContentChange.bind(this)} />
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.submit.bind(this)}>
            发布
          </button>
        </div>
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
    onSub: (comment) => {
      dispatch(addRedux(comment))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInput)
