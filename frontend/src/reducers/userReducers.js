import {
  USER_LOGIN_REQ,
  USER_LOGIN_SUC,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REG_REQ,
  USER_REG_SUC,
  USER_REG_FAIL
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_LOGIN_REQ:
      return { loading: true }
    case USER_LOGIN_SUC:
      return {
        loading: false,
        userInfo: payload
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: payload
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_REG_REQ:
      return { loading: true }
    case USER_REG_SUC:
      return {
        loading: false,
        userInfo: payload
      }
    case USER_REG_FAIL:
      return {
        loading: false,
        error: payload
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
