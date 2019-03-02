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
