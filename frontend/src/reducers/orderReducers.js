import {
  ORDER_CREATE_REQ,
  ORDER_CREATE_SUC,
  ORDER_CREATE_FAIL
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_CREATE_REQ:
      return {
        loading: true
      }
    case ORDER_CREATE_SUC:
      return {
        loading: false,
        success: true,
        order: payload
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        success: false,
        error: payload
      }
    default:
      return state
  }
}
