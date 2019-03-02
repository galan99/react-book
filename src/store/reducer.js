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