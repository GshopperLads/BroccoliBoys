import axios from 'axios'
import history from '../history'

const GET_USERS = 'GET_USERS'

const getUsers = users => ({
  type: GET_USERS,
  users
})

export const fetchUsers = (users) => {
  return async dispatch => {
    try {
      const res = await axios.put('/api/users', {"security": true})
      const users = res.data
      dispatch(getUsers(users))
      return users
    } catch (err) {
      console.error(err)
    }
  }
}


export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return [...action.users]
    default:
      return state
  }
}
