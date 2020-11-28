import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQ,
  USER_LOGOUT,
  USER_LOGIN_SUC,
  USER_REG_REQ,
  USER_REG_SUC,
  USER_REG_FAIL
} from '../constants/userConstants'

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQ })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUC,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({ type: USER_REG_REQ })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch({ type: USER_REG_SUC, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: USER_REG_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}
