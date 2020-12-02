import {
  ORDER_CREATE_REQ,
  ORDER_CREATE_SUC,
  ORDER_CREATE_FAIL
} from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQ })
    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(`/api/orders`, order, config)
    dispatch({ type: ORDER_CREATE_SUC, payload: data })
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}
