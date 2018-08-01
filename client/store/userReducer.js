import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const CHANGE_USER = "CHANGE_USER"

/**
 * ACTION CREATORS
 */
const deleteUser = user => ({
  type: REMOVE_USER,
  user
})
const changeUser = user => ({
  type: CHANGE_USER,
  user
})

const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

const defaultUser = {}
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    console.log("##########", res.data)
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, { email, password })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
    if (email === "admin@broccoliboys.com") {
      history.push('/admin')
    } else {
      history.push('/')
    }
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const authSignup = (email, name, password) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/signup`, { email, name, password })
    await axios.post('/api/users/email', { email, name, password })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
  } catch (err) {
    console.error(err)
  }
}

export const modifyUser = (userId, modifiedUser) => async dispatch => {
  try {
    console.log("mfuser", modifiedUser, userId)
    const res = await axios.put(`/api/users/${userId}`, modifiedUser, {"security": true})
    const user = res.data
    console.log("user: ", user)
    dispatch(getUser(user))

    history.push("/account")
  } catch (err) {
    console.error(err)
  }
}

/**
 * Reducer
 */
export const userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case CHANGE_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
