import axios from 'axios'
import {
  PRODUCT_LIST_REQ,
  PRODUCT_LIST_SUC,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQ,
  PRODUCT_DETAILS_SUC,
  PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'

export const listProducts = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_REQ })
    const { data } = await axios.get('/api/products')

    dispatch({ type: PRODUCT_LIST_SUC, payload: data })
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}

export const listProductDetails = id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQ })
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({ type: PRODUCT_DETAILS_SUC, payload: data })
  } catch (err) {
    console.error(err.message)
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
    })
  }
}
